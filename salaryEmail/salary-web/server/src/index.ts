import { APP_ENV, loadedEnvFiles } from './env' // 必须第一个导入：先加载 .env / .env.{环境} / .env.local
import { spawn } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import express, { type NextFunction, type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { loadSettings, saveSettings, toView, MASK } from './config'
import { store, statusKey, empNoKey, type LastStatus } from './store'
import { parseContacts, parseWorkbook, type ParseOptions } from './excel'
import { mainValue, renderHtml, renderSubject, renderText } from './render'
import { checkEmployees, toNumber } from './check'
import { initScheduler, runScheduled, saveSchedule, scheduleState } from './scheduler'
import {
  createTransport,
  normalizeError,
  sendMail,
  splitAddresses,
  verifyConnection,
} from './mailer'
import { authEnabled, isLoggedIn, login, logout, requireAuth } from './auth'
import type {
  Contact,
  Employee,
  EmployeeSummary,
  ImportResult,
  JobResultItem,
  JobStatus,
  LogEntry,
  Settings,
} from '../../shared/types'

const PORT = Number(process.env.PORT || 3001)
const app = express()
app.use(express.json())
app.use(cookieParser())

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const now = () => new Date().toISOString()
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/** 最近一次上传的原始文件，用于调整列映射后免重传重新解析 */

interface Job extends JobStatus {
  cancel: boolean
}
const jobs = new Map<string, Job>()

/** 从表名里提取月份（2026年10月 / 2026-10 → 2026-10），识别不出来返回 '' */
function monthOf(sheet: string) {
  const m = sheet.match(/(\d{4})\s*[年\-/]\s*(\d{1,2})/)
  return m ? `${m[1]}-${Number(m[2])}` : ''
}

/**
 * 查某人上次发送结果：按工号 → 姓名+邮箱。
 * 表名改了、重新导入、重启都能对上；但跨月（10月 → 11月）不继承，避免误以为已发过。
 */
function lastStatusOf(map: Map<string, LastStatus>, e: Employee): LastStatus | undefined {
  const hit = (e.empNo ? map.get(empNoKey(e.empNo)) : undefined) ?? map.get(statusKey(e))
  if (!hit) return undefined
  const a = monthOf(e.sheet)
  const b = monthOf(hit.sheet)
  if (a && b && a !== b) return undefined
  return hit
}

function summaries(): EmployeeSummary[] {
  const map = store.lastStatusMap()
  return store.employees.map((e) => {
    const st = lastStatusOf(map, e)
    return {
      id: e.id,
      sheet: e.sheet,
      name: e.name,
      email: e.email,
      valid: e.valid,
      total: mainValue(e),
      lastStatus: st?.status ?? null,
      lastError: st?.error,
      lastTime: st?.time,
      emailSource: e.emailSource ?? (e.email ? 'sheet' : 'none'),
    }
  })
}

/** 主数值合计（用于每月快照与体检对比） */
function sumAmount(list: Employee[]) {
  return list.reduce((acc, e) => acc + (toNumber(mainValue(e)) ?? 0), 0)
}

/** 取工资表中某列的值（用于按工号匹配） */
function itemValue(e: Employee, column: string) {
  const it = e.items.find((i) => i.key === column || i.key.includes(column))
  return (it?.value ?? '').trim()
}

/** 用通讯录给每个员工确定邮箱：命中通讯录 > 表格自带邮箱 > 未匹配 */
function resolveEmails(list: Employee[], s: Settings) {
  const warnings: string[] = []
  const contacts = store.contacts.filter((c) => c.active)
  const byName = new Map<string, Contact[]>()
  const byEmpNo = new Map<string, Contact[]>()
  for (const c of contacts) {
    const n = c.name.trim()
    if (n) byName.set(n, [...(byName.get(n) ?? []), c])
    const no = c.empNo.trim()
    if (no) byEmpNo.set(no, [...(byEmpNo.get(no) ?? []), c])
  }

  const ambiguous = new Set<string>()
  let unmatched = 0

  for (const e of list) {
    const sheetEmail = (e.sheetEmail ?? (e.emailSource === 'contact' ? '' : e.email)).trim()

    if (!s.useContacts) {
      e.email = sheetEmail
      e.emailSource = sheetEmail ? 'sheet' : 'none'
      e.valid = EMAIL_RE.test(e.email)
      if (!e.email) unmatched++
      continue
    }

    // 先按姓名匹配；同名则用工资表里的工号区分；姓名都没匹配上时用工作号兜底
    const name = e.name.trim()
    const empNo = (e.empNo ?? '').trim() || itemValue(e, s.empNoColumn)
    const sameName = byName.get(name) ?? []
    let hit: Contact | undefined
    let dup = false

    if (sameName.length === 1) {
      hit = sameName[0]
    } else if (sameName.length > 1) {
      const c = empNo ? sameName.find((x) => x.empNo.trim() === empNo) : undefined
      if (c) hit = c
      else dup = true
    } else if (empNo) {
      const arr = byEmpNo.get(empNo) ?? []
      if (arr.length === 1) hit = arr[0]
      else if (arr.length > 1) dup = true
    }

    if (hit) {
      e.email = hit.email.trim()
      e.emailSource = 'contact'
    } else {
      e.email = sheetEmail
      e.emailSource = sheetEmail ? 'sheet' : 'none'
      if (dup) ambiguous.add(e.name || '(无姓名)')
      if (!sheetEmail) unmatched++
    }
    e.valid = EMAIL_RE.test(e.email)
  }

  if (ambiguous.size) {
    warnings.push(
      `通讯录中存在重复人员，已跳过自动匹配，请手动指定：${[...ambiguous].slice(0, 10).join('、')}`,
    )
  }
  if (unmatched) {
    warnings.push(
      `有 ${unmatched} 人未匹配到邮箱，可在列表中点「补邮箱」手动指定（也可在「员工管理」里新增后点「重新匹配」）`,
    )
  }
  return { warnings, unmatched }
}

async function runJob(job: Job, ids: string[], force: boolean) {
  const s = loadSettings()
  const transport = createTransport(s)
  const batchId = crypto.randomUUID().slice(0, 8)
  const statusMap = store.lastStatusMap()
  const from = { name: s.senderName, address: s.smtpUser }
  const bcc = splitAddresses(s.bcc)
  const logs: Omit<LogEntry, 'id'>[] = []

  try {
    for (let i = 0; i < ids.length; i++) {
      if (job.cancel) break
      const emp = store.find(ids[i])
      if (!emp) continue

      const push = (r: JobResultItem) => {
        job.done++
        job.results.push(r)
      }

      if (!emp.valid) {
        job.failed++
        push({ id: emp.id, name: emp.name, email: emp.email, ok: false, error: '邮箱格式不正确，已跳过' })
        continue
      }
      const last = lastStatusOf(statusMap, emp)
      if (!force && last?.status === 'success') {
        job.skipped++
        push({ id: emp.id, name: emp.name, email: emp.email, ok: false, skipped: true })
        continue
      }

      const subject = renderSubject(s.subjectTemplate, emp.sheet, emp.name)
      const html = renderHtml(emp, subject)
      const text = renderText(emp, subject)
      let err = ''
      for (let attempt = 0; attempt <= s.retry; attempt++) {
        try {
          await sendMail(transport, { from, to: emp.email, bcc, subject, html, text })
          err = ''
          break
        } catch (e) {
          err = normalizeError(e)
          if (attempt < s.retry) await sleep(1500)
        }
      }

      if (err) job.failed++
      else job.success++
      push({ id: emp.id, name: emp.name, email: emp.email, ok: !err, error: err || undefined })
      logs.push({
        time: now(),
        batchId,
        sheet: emp.sheet,
        name: emp.name,
        email: emp.email,
        empNo: emp.empNo ?? '',
        status: err ? 'failed' : 'success',
        error: err || undefined,
      })

      if (i < ids.length - 1) await sleep(s.delayMs)
    }
  } finally {
    transport.close()
    if (logs.length) store.addLogs(logs)
    job.state = job.cancel ? 'cancelled' : 'done'
  }
}

// ------------------------------------------------------------------ 路由
app.use('/api', requireAuth)

const wrap =
  (fn: (req: Request, res: Response) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res).catch(next)

app.get('/api/auth/state', (req, res) =>
  res.json({ needPassword: authEnabled(), loggedIn: authEnabled() ? isLoggedIn(req) : true }),
)

app.post('/api/auth/login', (req, res) => {
  const ok = login(res, String(req.body?.password ?? ''))
  res.json(ok ? { ok: true } : { ok: false, error: '密码不正确' })
})

app.post('/api/auth/logout', (_req, res) => {
  logout(res)
  res.json({ ok: true })
})

app.get('/api/settings', (_req, res) => res.json(toView(loadSettings())))

app.put('/api/settings', (req, res) => {
  const cur = loadSettings()
  const body = req.body ?? {}
  const next: Settings = {
    ...cur,
    smtpHost: String(body.smtpHost ?? cur.smtpHost).trim(),
    smtpPort: Number(body.smtpPort ?? cur.smtpPort) || cur.smtpPort,
    secure: body.secure === undefined ? cur.secure : !!body.secure,
    allowInsecureTLS: !!body.allowInsecureTLS,
    smtpUser: String(body.smtpUser ?? cur.smtpUser).trim(),
    smtpPass: body.smtpPass && body.smtpPass !== MASK ? String(body.smtpPass) : cur.smtpPass,
    senderName: String(body.senderName ?? cur.senderName).trim(),
    subjectTemplate: String(body.subjectTemplate ?? cur.subjectTemplate).trim() || cur.subjectTemplate,
    bcc: String(body.bcc ?? cur.bcc).trim(),
    retry: Math.max(0, Math.min(5, Number(body.retry ?? cur.retry))),
    delayMs: Math.max(0, Math.min(10000, Number(body.delayMs ?? cur.delayMs))),
    nameColumn: String(body.nameColumn ?? cur.nameColumn).trim() || cur.nameColumn,
    // 邮箱列名允许清空：工资表不含邮箱列时完全依赖通讯录
    emailColumn: String(body.emailColumn ?? cur.emailColumn).trim(),
    useContacts: body.useContacts === undefined ? cur.useContacts : !!body.useContacts,
    empNoColumn: String(body.empNoColumn ?? cur.empNoColumn).trim(),
  }
  saveSettings(next)
  res.json(toView(loadSettings()))
})

app.post(
  '/api/settings/test',
  wrap(async (req, res) => {
    const s = loadSettings()
    const to = String(req.body?.to ?? '').trim()
    if (!s.smtpUser || !s.smtpPass) throw new Error('请先填写邮箱账号与授权码')
    if (!to) throw new Error('请填写接收测试邮件的邮箱')
    const v = await verifyConnection(s)
    if (!v.ok) throw new Error(`SMTP 连接失败：${v.error}`)
    const transport = createTransport(s)
    try {
      const subject = '【工资条系统】测试邮件'
      await sendMail(transport, {
        from: { name: s.senderName, address: s.smtpUser },
        to,
        bcc: splitAddresses(s.bcc),
        subject,
        html: `<div style="font-family:'Microsoft YaHei',Arial;padding:24px">
          <h3 style="margin:0 0 8px">${subject}</h3>
          <p style="color:#666">如果你收到这封邮件，说明 SMTP 配置正确。</p></div>`,
        text: '如果你收到这封邮件，说明 SMTP 配置正确。',
      })
      res.json({ ok: true })
    } finally {
      transport.close()
    }
  }),
)

/** 还原上传文件的中文名：busboy 把 UTF-8 字节按 latin1 解码了 */
function decodeUploadName(name: string) {
  return Buffer.from(name, 'latin1').toString('utf8')
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (!['.xlsx', '.xlsm', '.csv'].includes(ext)) {
      return cb(new Error('仅支持 .xlsx / .xlsm / .csv；老版 .xls 请在 Excel 里另存为 .xlsx'))
    }
    cb(null, true)
  },
})

async function doImport(buffer: Buffer, ext: string, file: string, opts: ParseOptions = {}) {
  // 默认自动识别列名（姓名/工号/邮箱），不用手工指定；设置里的列名作为兜底
  const s0 = loadSettings()
  const result = await parseWorkbook(buffer, ext, {
    auto: true,
    nameColumn: s0.nameColumn,
    emailColumn: s0.emailColumn,
    empNoColumn: s0.empNoColumn,
    ...opts,
  })
  const s = loadSettings()
  const { warnings, unmatched } = resolveEmails(result.employees, s)
  store.setEmployees(result.employees, file)
  // 记一份本月快照，下次导入时体检可对比人数/金额是否异常
  const month = result.employees.length ? monthOf(result.employees[0].sheet) : ''
  store.addSnapshot(month, result.employees.length, sumAmount(result.employees))
  const payload: ImportResult = {
    file,
    sheetCount: result.sheetCount,
    headers: result.headers,
    nameColumn: result.usedNameColumn,
    emailColumn: result.usedEmailColumn,
    empNoColumn: result.usedEmpNoColumn,
    warnings: [...result.warnings, ...warnings],
    employees: summaries(),
    unmatched,
  }
  return payload
}

app.post(
  '/api/import',
  upload.single('file'),
  wrap(async (req, res) => {
    const file = req.file
    if (!file) throw new Error('没有收到文件')
    const ext = path.extname(file.originalname).toLowerCase().slice(1)
    const name = decodeUploadName(file.originalname)
    res.json(await doImport(file.buffer, ext, name))
  }),
)

app.get('/api/employees', (_req, res) =>
  res.json({ employees: summaries(), meta: store.meta }),
)

app.get('/api/employees/:id/render', (req, res) => {
  const emp = store.find(req.params.id)
  if (!emp) return res.status(404).json({ error: '人员不存在' })
  const s = loadSettings()
  const subject = renderSubject(s.subjectTemplate, emp.sheet, emp.name)
  res.json({ subject, html: renderHtml(emp, subject), text: renderText(emp, subject) })
})

app.delete('/api/employees', (_req, res) => {
  store.clearEmployees()
  res.json({ ok: true })
})

function makeJob(ids: string[]): Job {
  const job: Job = {
    id: crypto.randomUUID(),
    state: 'running',
    total: ids.length,
    done: 0,
    success: 0,
    failed: 0,
    skipped: 0,
    startedAt: Date.now(),
    results: [],
    cancel: false,
  }
  jobs.set(job.id, job)
  return job
}

/** 定时任务用：发给当前表里所有人，返回任务结果 */
async function sendAll(force: boolean): Promise<JobStatus> {
  const s = loadSettings()
  if (!s.smtpUser || !s.smtpPass) throw new Error('请先在「设置」中填写邮箱账号与授权码')
  const ids = store.employees.map((e) => e.id)
  if (!ids.length) throw new Error('尚未导入工资表')
  const job = makeJob(ids)
  await runJob(job, ids, force)
  return job
}

app.post(
  '/api/send',
  wrap(async (req, res) => {
    const s = loadSettings()
    if (!s.smtpUser || !s.smtpPass) throw new Error('请先在「设置」中填写邮箱账号与授权码')
    const ids: string[] = Array.isArray(req.body?.ids) ? req.body.ids : []
    if (!ids.length) throw new Error('没有选中任何人员')
    const force = !!req.body?.force
    const job = makeJob(ids)
    runJob(job, ids, force).catch(() => {
      job.state = 'done'
    })
    res.json({ jobId: job.id })
  }),
)

// ------------------------------------------------------------------ 发送前体检
function checkReport() {
  const list = store.employees
  const month = list.length ? monthOf(list[0].sheet) : ''
  return checkEmployees(list, store.prevSnapshot(month))
}

app.get('/api/check', (_req, res) => res.json(checkReport()))

// ------------------------------------------------------------------ 定时发送
app.get('/api/schedule', (_req, res) => res.json(scheduleState()))

app.put('/api/schedule', (req, res) => {
  try {
    res.json(saveSchedule(req.body ?? {}))
  } catch (e: any) {
    res.status(400).json({ error: e?.message ?? String(e) })
  }
})

app.post(
  '/api/schedule/run',
  wrap(async (_req, res) => {
    const result = await runScheduled('手动')
    res.json({ ...scheduleState(), result })
  }),
)

app.get('/api/job/:id', (req, res) => {
  const job = jobs.get(req.params.id)
  if (!job) return res.status(404).json({ error: '任务不存在' })
  const { cancel, ...rest } = job
  void cancel
  res.json(rest)
})

app.post('/api/job/:id/cancel', (req, res) => {
  const job = jobs.get(req.params.id)
  if (!job) return res.status(404).json({ error: '任务不存在' })
  job.cancel = true
  res.json({ ok: true })
})

app.get('/api/logs', (_req, res) => res.json({ logs: store.logs.slice(0, 1000) }))

app.get('/api/logs/export', (_req, res) => {
  const rows = store.logs
  const head = '\uFEFF时间,工作表,姓名,邮箱,结果,失败原因\n'
  const body = rows
    .map((l) =>
      [
        new Date(l.time).toLocaleString('zh-CN'),
        l.sheet,
        l.name,
        l.email,
        l.status === 'success' ? '成功' : '失败',
        l.error ?? '',
      ]
        .map((c) => `"${String(c).replace(/"/g, '""')}"`)
        .join(','),
    )
    .join('\n')
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="send-log-${new Date().toISOString().slice(0, 10)}.csv"`,
  )
  res.send(head + body)
})

// ------------------------------------------------------------------ 员工通讯录
app.get('/api/contacts', (_req, res) =>
  res.json({
    contacts: store.contacts,
    columns: store.contactColumns,
    source: store.contactsMeta.source,
    importedAt: store.contactsMeta.importedAt,
  }),
)

// 通讯录是只读的：财务在 Excel 里维护好，人员变动直接重新导入。
// 所以这里只保留「列表查看」和「导入」，不提供增删改 / 导出 / 同步回写。

app.post(
  '/api/contacts/import',
  upload.single('file'),
  wrap(async (req, res) => {
    const file = req.file
    if (!file) throw new Error('没有收到文件')
    const ext = path.extname(file.originalname).toLowerCase().slice(1)
    const { rows, warnings, columns } = await parseContacts(file.buffer, ext)
    if (columns.length) store.setContactColumns(columns) // 列顺序跟着表格走
    store.setContactsMeta(decodeUploadName(file.originalname)) // 记住这次导入的是哪个表

    // 导入方式：merge=增量（保留表格外的人）
    //           sync-disable=以表格为准，表格里没有的停用
    //           sync-delete=以表格为准，表格里没有的删除
    const mode = ['merge', 'sync-disable', 'sync-delete'].includes(String(req.body?.mode))
      ? String(req.body?.mode)
      : 'merge'

    let added = 0
    let updated = 0
    let skipped = 0
    /** 本次表格里出现过的人，用于判断"表格外的人" */
    const touched = new Set<string>()

    for (const r of rows) {
      // 有工号：只按工号匹配（同名但工号不同 = 两个人，必须各自新增）
      // 无工号：按姓名匹配，同名且多于一人则跳过
      let exist = r.empNo
        ? store.contacts.find((c) => c.empNo && c.empNo === r.empNo)
        : undefined
      const byName = !exist && !r.empNo ? store.contacts.filter((c) => c.name === r.name) : []
      if (!exist && !r.empNo) exist = byName[0]

      // 邮箱为空/不合法：不更新，但只要人还在表格里出现，就不能当成"已删除"
      if (!r.name || !EMAIL_RE.test(r.email)) {
        skipped++
        if (exist) touched.add(exist.id)
        if (byName.length > 1) byName.forEach((c) => touched.add(c.id))
        continue
      }
      if (byName.length > 1) {
        skipped++
        warnings.push(`存在多个同名「${r.name}」且无工号区分，已跳过（请补工号后重新导入）`)
        byName.forEach((c) => touched.add(c.id))
        continue
      }
      if (exist) {
        // 重新导入 = 覆盖更新（按工号/姓名定位），不会产生重复
        // 注意：姓名必须一起更新，否则改名后界面还是旧名字
        store.updateContact(exist.id, {
          name: r.name,
          email: r.email,
          empNo: r.empNo || exist.empNo,
          // 以表格为准：部门/备注也覆盖（表格里清空就清空）
          department: r.department,
          note: r.note,
          active: r.active ?? exist.active,
          // 自定义列以表格为准（表格里清空就清空），不残留上一次导入的旧值
          extra: r.extra,
        })
        touched.add(exist.id)
        updated++
      } else {
        const c = store.addContact({
          name: r.name,
          email: r.email,
          empNo: r.empNo,
          department: r.department,
          active: r.active ?? true,
          note: r.note,
          extra: r.extra,
        })
        touched.add(c.id)
        added++
      }
    }

    // 处理"表格里已经没有的人"
    let disabled = 0
    let removed = 0
    if (mode !== 'merge' && touched.size) {
      for (const c of store.contacts.filter((x) => !touched.has(x.id))) {
        if (mode === 'sync-delete') {
          store.removeContact(c.id)
          removed++
        } else {
          store.updateContact(c.id, { active: false })
          disabled++
        }
      }
    }

    res.json({
      added,
      updated,
      skipped,
      disabled,
      removed,
      mode,
      warnings,
      contacts: store.contacts,
      columns: store.contactColumns,
      source: store.contactsMeta.source,
      importedAt: store.contactsMeta.importedAt,
    })
  }),
)

/** 手动给某个人指定邮箱（直接填，或从通讯录选） */
app.post('/api/employees/bind', (req, res) => {
  const emp = store.find(String(req.body?.id ?? ''))
  if (!emp) return res.status(404).json({ error: '人员不存在' })
  let mail = String(req.body?.email ?? '').trim()
  let source: 'manual' | 'contact' = 'manual'
  const contactId = String(req.body?.contactId ?? '')
  if (contactId) {
    const c = store.contacts.find((x) => x.id === contactId)
    if (!c) return res.status(404).json({ error: '通讯录员工不存在' })
    mail = c.email.trim()
    source = 'contact'
  }
  if (!EMAIL_RE.test(mail)) return res.status(400).json({ error: '邮箱格式不正确' })
  emp.email = mail
  emp.emailSource = source
  emp.valid = true
  store.setEmployees(store.employees, store.meta.source ?? '')
  res.json({ ok: true, employee: summaries().find((e) => e.id === emp.id) })
})

/** 用当前通讯录重新匹配已导入工资表的邮箱 */
app.post('/api/employees/resolve', (_req, res) => {
  const s = loadSettings()
  const { warnings, unmatched } = resolveEmails(store.employees, s)
  store.setEmployees(store.employees, store.meta.source ?? '')
  res.json({ employees: summaries(), warnings, unmatched })
})

// ------------------------------------------------------------------ 静态资源 / 错误处理
const dist = path.resolve(process.cwd(), 'dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err?.status || (err instanceof multer.MulterError ? 400 : 400)
  console.error('[error]', err?.message || err)
  res.status(status).json({ error: err?.message || '服务器内部错误' })
})

// 启动定时发送（到点自动发给当前工资表里的所有人）
initScheduler(sendAll)
const st0 = scheduleState()
if (st0.enabled)
  console.log(
    `定时发送已启用：每月 ${st0.day === 'last' ? '最后一天' : st0.day + ' 号'} ${String(st0.hour).padStart(2, '0')}:${String(st0.minute).padStart(2, '0')}，下次 ${st0.nextRun ? new Date(st0.nextRun).toLocaleString('zh-CN') : '—'}`,
  )

app.listen(PORT, () => {
  console.log(`工资条发送系统已启动: http://localhost:${PORT}`)
  console.log(`运行环境: ${APP_ENV}（环境变量文件: ${loadedEnvFiles.join(' → ') || '无，用 server/data/settings.json 里的设置'}）`)
  if (!authEnabled()) console.log('提示: 未设置 WEB_PASSWORD，当前无需登录即可访问')
})

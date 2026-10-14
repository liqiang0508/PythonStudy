import crypto from 'node:crypto'
import { Readable } from 'node:stream'
import ExcelJS from 'exceljs'
import type { Contact, Employee, SalaryItem } from '../../shared/types'

/** 除表头 <b> 标记外，这些关键字也自动加粗 */
const BOLD_KEYWORDS = /合计|实发|应发|总计/
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

function fmtDate(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

function fmtNumber(n: number) {
  if (Number.isInteger(n)) return n.toLocaleString('en-US')
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function cellText(v: ExcelJS.CellValue): string {
  if (v === null || v === undefined) return ''
  if (v instanceof Date) return fmtDate(v)
  if (typeof v === 'object') {
    const o = v as Record<string, any>
    if (o.result !== undefined && o.result !== null) return cellText(o.result)
    if (typeof o.text === 'string') return o.text.trim()
    if (Array.isArray(o.richText)) return o.richText.map((r: any) => r?.text ?? '').join('').trim()
    return ''
  }
  if (typeof v === 'number') return fmtNumber(v)
  if (typeof v === 'boolean') return v ? '是' : '否'
  return String(v).trim()
}

function resolveColumn(headers: string[], wanted: string, fallbackIdx: number, warnings: string[]) {
  const exact = headers.findIndex((h) => h === wanted)
  if (exact >= 0) return exact
  if (wanted) {
    const like = headers.findIndex((h) => h.includes(wanted))
    if (like >= 0) {
      warnings.push(`未找到名为「${wanted}」的列，已使用「${headers[like]}」`)
      return like
    }
  }
  warnings.push(`未找到「${wanted}」列，默认使用第 ${fallbackIdx + 1} 列「${headers[fallbackIdx] ?? '空'}」，请确认后重新导入`)
  return fallbackIdx
}

/** 只找不猜：找到返回下标，找不到返回 -1 */
function findColumn(headers: string[], wanted: string) {
  if (!wanted) return -1
  const exact = headers.findIndex((h) => h === wanted)
  if (exact >= 0) return exact
  return headers.findIndex((h) => h.includes(wanted))
}

/** 自动识别列名用的规则（按顺序匹配） */
export const NAME_RE = /姓名|名字|员工姓名|人员姓名/
export const EMPNO_RE = /工号|员工号|员工编号|编号/
export const EMAIL_COL_RE = /邮箱|邮件|e-?mail/i
export const DEPT_RE = /部门/
export const NOTE_RE = /备注|说明|note/i
export const STATUS_RE = /在职|状态/

function detectColumn(headers: string[], re: RegExp) {
  return headers.findIndex((h) => re.test(h))
}

export interface ParseOptions {
  /** 自动识别（默认）：按表头关键字找姓名/工号/邮箱列 */
  auto?: boolean
  nameColumn?: string
  emailColumn?: string
  empNoColumn?: string
}

export interface ParseResult {
  employees: Employee[]
  headers: string[]
  sheetCount: number
  warnings: string[]
  /** 实际用到的列名；表格里没有时为空 */
  usedEmailColumn: string
  usedNameColumn: string
  usedEmpNoColumn: string
}

export async function parseWorkbook(
  buffer: Buffer,
  ext: string,
  opts: ParseOptions = {},
): Promise<ParseResult> {
  const wb = new ExcelJS.Workbook()
  if (ext === 'csv') {
    let text = buffer.toString('utf-8')
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
    await wb.csv.read(Readable.from(text) as any)
  } else {
    await wb.xlsx.load(buffer as any)
  }

  const employees: Employee[] = []
  const warnings: string[] = []
  const headerSet = new Set<string>()
  let sheetCount = 0
  let usedEmailColumn = ''
  let usedNameColumn = ''
  let usedEmpNoColumn = ''
  const auto = opts.auto !== false

  for (const ws of wb.worksheets) {
    const rows: string[][] = []
    for (let i = 1; i <= ws.rowCount; i++) {
      const row = ws.getRow(i)
      const vals: string[] = []
      for (let j = 1; j <= ws.columnCount; j++) vals.push(cellText(row.getCell(j).value))
      rows.push(vals)
    }
    const headerIdx = rows.findIndex((r) => r.some((c) => c !== ''))
    if (headerIdx < 0) continue
    sheetCount++

    const rawHeaders = rows[headerIdx]
    const headers = rawHeaders.map((h) => h.replace(/<[^>]+>/g, '').trim())
    headers.forEach((h) => h && headerSet.add(h))

    // 自动识别：按表头关键字找；找不到邮箱列就完全用通讯录（不能猜第 2 列，否则会把姓名当邮箱）
    let nIdx = -1
    let eIdx = -1
    let noIdx = -1
    if (auto) {
      nIdx = detectColumn(headers, NAME_RE)
      noIdx = detectColumn(headers, EMPNO_RE)
      eIdx = detectColumn(headers, EMAIL_COL_RE)
      // 设置里的列名作为兜底
      if (nIdx < 0) nIdx = findColumn(headers, opts.nameColumn ?? '')
      if (noIdx < 0) noIdx = findColumn(headers, opts.empNoColumn ?? '')
      if (eIdx < 0) eIdx = findColumn(headers, opts.emailColumn ?? '')
      if (nIdx < 0) {
        nIdx = 0
        warnings.push(
          `表头里没找到「姓名」列，已默认用第 1 列「${headers[0] || '空'}」，请核对（可在导入后点「手动指定列」修改）`,
        )
      }
    } else {
      nIdx = resolveColumn(headers, opts.nameColumn ?? '姓名', 0, warnings)
      noIdx = findColumn(headers, opts.empNoColumn ?? '')
      eIdx = findColumn(headers, opts.emailColumn ?? '')
    }
    if (nIdx >= 0 && !usedNameColumn) usedNameColumn = headers[nIdx] ?? ''
    if (eIdx >= 0 && !usedEmailColumn) usedEmailColumn = headers[eIdx]
    if (noIdx >= 0 && !usedEmpNoColumn) usedEmpNoColumn = headers[noIdx]

    for (const r of rows.slice(headerIdx + 1)) {
      if (r.every((c) => c === '')) continue
      const name = (r[nIdx] ?? '').trim()
      const email = eIdx >= 0 ? (r[eIdx] ?? '').trim() : ''
      const items: SalaryItem[] = []
      headers.forEach((h, i) => {
        if (i === nIdx || i === eIdx || !h) return
        const bold = /^<b>/i.test((rawHeaders[i] ?? '').trim()) || BOLD_KEYWORDS.test(h)
        const value = (r[i] ?? '').trim()
        if (!value && !bold) return
        items.push({ key: h, value, bold })
      })
      employees.push({
        id: crypto.randomUUID(),
        sheet: ws.name,
        name,
        email,
        valid: EMAIL_RE.test(email),
        items,
        sheetEmail: email,
        empNo: noIdx >= 0 ? (r[noIdx] ?? '').trim() : '',
      })
    }
  }

  if (!employees.length) warnings.push('没有解析到任何人员数据，请检查表头行是否正确')

  const dup = new Map<string, number>()
  employees
    .filter((e) => e.email) // 工资表不含邮箱列时不应报“重复邮箱”
    .forEach((e) => dup.set(e.email.toLowerCase(), (dup.get(e.email.toLowerCase()) ?? 0) + 1))
  const dups = [...dup.entries()].filter(([, c]) => c > 1)
  if (dups.length) warnings.push(`存在 ${dups.length} 个重复邮箱，请确认是否为多人共用邮箱`)

  return {
    employees,
    headers: [...headerSet],
    sheetCount,
    warnings: [...new Set(warnings)],
    usedEmailColumn,
    usedNameColumn,
    usedEmpNoColumn,
  }
}

export interface ContactRow {
  name: string
  email: string
  empNo: string
  department: string
  note: string
  /** 表里没写「在职」列时为 undefined，表示不改这个字段 */
  active?: boolean
  /** 表里其它列（如入职日期、岗位）原样带过来，导出时不丢 */
  extra: Record<string, string>
}

/** 解析通讯录表格：需要「姓名」「邮箱」列，工号/部门列可选 */
export async function parseContacts(buffer: Buffer, ext: string): Promise<{
  rows: ContactRow[]
  headers: string[]
  /** 原始表头顺序（用于展示与导出时保持列顺序一致） */
  columns: string[]
  warnings: string[]
}> {
  const wb = new ExcelJS.Workbook()
  if (ext === 'csv') {
    let text = buffer.toString('utf-8')
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
    await wb.csv.read(Readable.from(text) as any)
  } else {
    await wb.xlsx.load(buffer as any)
  }

  const rows: ContactRow[] = []
  const warnings: string[] = []
  const headerSet = new Set<string>()
  const columns: string[] = []

  for (const ws of wb.worksheets) {
    const grid: string[][] = []
    for (let i = 1; i <= ws.rowCount; i++) {
      const row = ws.getRow(i)
      const vals: string[] = []
      for (let j = 1; j <= ws.columnCount; j++) vals.push(cellText(row.getCell(j).value))
      grid.push(vals)
    }
    const headerIdx = grid.findIndex((r) => r.some((c) => c !== ''))
    if (headerIdx < 0) continue
    const headers = grid[headerIdx].map((h) => h.trim())
    headers.forEach((h) => h && headerSet.add(h))
    // 记录表头顺序：展示与导出都按这个顺序，和你在 Excel 里看到的一致
    if (!columns.length) headers.forEach((h) => h && !columns.includes(h) && columns.push(h))

    const pick = (...names: string[]) =>
      headers.findIndex((h) => names.some((n) => h === n || h.includes(n)))

    const nIdx = pick('姓名', '名字', '员工')
    const eIdx = pick('邮箱', '邮件', 'Email', 'email')
    if (nIdx < 0 || eIdx < 0) {
      warnings.push(`工作表[${ws.name}]缺少姓名或邮箱列，已跳过`)
      continue
    }
    const noIdx = pick('工号', '员工号', '编号')
    const dIdx = pick('部门', '部门名称')
    const noteIdx = pick('备注', '说明')
    const activeIdx = pick('在职', '状态', '是否在职')
    const used = new Set([nIdx, eIdx, noIdx, dIdx, noteIdx, activeIdx])

    for (const r of grid.slice(headerIdx + 1)) {
      const name = (r[nIdx] ?? '').trim()
      const email = (r[eIdx] ?? '').trim()
      if (!name && !email) continue
      const extra: Record<string, string> = {}
      headers.forEach((h, i) => {
        if (!h || used.has(i)) return
        const v = (r[i] ?? '').trim()
        if (v) extra[h] = v
      })
      const activeRaw = activeIdx >= 0 ? (r[activeIdx] ?? '').trim() : ''
      rows.push({
        name,
        email,
        empNo: noIdx >= 0 ? (r[noIdx] ?? '').trim() : '',
        department: dIdx >= 0 ? (r[dIdx] ?? '').trim() : '',
        note: noteIdx >= 0 ? (r[noteIdx] ?? '').trim() : '',
        active: activeIdx >= 0 ? !/^(否|停用|离职|false|0|n|no)$/i.test(activeRaw) : undefined,
        extra,
      })
    }
  }

  if (!rows.length) warnings.push('通讯录中没有解析到任何员工')
  return { rows, headers: [...headerSet], columns, warnings }
}

const CONTACT_FIELDS: Array<{ test: RegExp; get: (c: Contact) => string }> = [
  { test: /工号|员工号|编号|工号$/, get: (c) => c.empNo },
  { test: /姓名|名字/, get: (c) => c.name },
  { test: /邮箱|邮件|e-?mail/i, get: (c) => c.email },
  { test: /部门/, get: (c) => c.department },
  { test: /备注|说明|note/i, get: (c) => c.note },
  { test: /在职|状态/, get: (c) => (c.active ? '是' : '否') },
]

const DEFAULT_CONTACT_COLUMNS = ['工号', '姓名', '邮箱', '部门', '在职', '备注']

/** 导出通讯录：列顺序与导入时的表头一致，可改完直接重新导入 */
export async function buildContactsWorkbook(
  contacts: Contact[],
  columns: string[],
): Promise<Buffer> {
  // 表里有、但不在列清单里的自定义列，追加到末尾，避免丢数据
  const extraKeys: string[] = []
  for (const c of contacts) {
    for (const k of Object.keys(c.extra ?? {})) {
      if (!columns.includes(k) && !extraKeys.includes(k)) extraKeys.push(k)
    }
  }
  const cols = [...(columns.length ? columns : DEFAULT_CONTACT_COLUMNS), ...extraKeys]

  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('通讯录')
  ws.columns = cols.map((c) => ({
    header: c,
    width: c.length > 4 ? 24 : 12,
  }))
  for (const c of contacts) {
    ws.addRow(
      cols.map((col) => {
        const f = CONTACT_FIELDS.find((x) => x.test.test(col))
        return f ? f.get(c) : (c.extra?.[col] ?? '')
      }),
    )
  }
  ws.getRow(1).font = { bold: true }
  ws.views = [{ state: 'frozen', ySplit: 1 }]
  return Buffer.from(await wb.xlsx.writeBuffer())
}

/** 生成导入模板 */
export async function buildTemplate(): Promise<Buffer> {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('11月工资')
  ws.columns = [
    { header: '工号', width: 10 },
    { header: '姓名', width: 12 },
    { header: '邮箱', width: 26 },
    { header: '基本工资', width: 12 },
    { header: '加班工资', width: 12 },
    { header: '全勤奖励', width: 12 },
    { header: '<b>减</b>', width: 10 },
    { header: '迟到扣款', width: 12 },
    { header: '缺勤扣款', width: 12 },
    { header: '<b>税前合计</b>', width: 14 },
    { header: '代扣-社保', width: 12 },
    { header: '代扣-公积金', width: 12 },
    { header: '<b>本月实发总计</b>', width: 16 },
    { header: '特殊情况说明', width: 24 },
  ]
  ws.getRow(1).font = { bold: true }
  ws.addRow(['E001', '张三', 'zhangsan@example.com', 8000, 500, 200, '', 0, 0, 8700, 800, 600, 7300, ''])
  ws.addRow(['E002', '李四', 'lisi@example.com', 7500, 0, 200, '', 50, 0, 7650, 800, 600, 6250, '事假1天'])
  const buf = await wb.xlsx.writeBuffer()
  return Buffer.from(buf)
}

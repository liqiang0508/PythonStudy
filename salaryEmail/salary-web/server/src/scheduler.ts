import { monthOf, checkEmployees } from './check'
import { store } from './store'
import type { JobStatus, Schedule, ScheduleState } from '../../shared/types'

/** 由 index.ts 注入：真正执行批量发送，返回任务结果 */
type Sender = (force: boolean) => Promise<JobStatus>

let sender: Sender | null = null
let timer: NodeJS.Timeout | null = null
let running = false
let lastJobId: string | null = null

/** 每个月的第 day 天（超出当月天数时取最后一天） */
function buildAt(s: Schedule, year: number, month: number): Date {
  const days = new Date(year, month + 1, 0).getDate()
  const day = s.day === 'last' ? days : Math.min(Math.max(Number(s.day) || 1, 1), days)
  return new Date(year, month, day, clamp(s.hour, 0, 23), clamp(s.minute, 0, 59), 0, 0)
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(Number(n) || 0, min), max)
}

/** 下一次执行时间 */
export function nextRunAt(s: Schedule, from = new Date()): Date | null {
  for (let i = 0; i < 15; i++) {
    const base = new Date(from.getFullYear(), from.getMonth() + i, 1)
    const d = buildAt(s, base.getFullYear(), base.getMonth())
    if (d.getTime() > from.getTime()) return d
  }
  return null
}

/** 最近一次「本应执行」的时间点（<= now） */
function lastDueAt(s: Schedule, from = new Date()): Date | null {
  for (let i = 0; i < 3; i++) {
    const base = new Date(from.getFullYear(), from.getMonth() - i, 1)
    const d = buildAt(s, base.getFullYear(), base.getMonth())
    if (d.getTime() <= from.getTime()) return d
  }
  return null
}

function fmt(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/** 按当前配置执行一次（定时任务到点 / 界面点「立即执行」） */
export async function runScheduled(reason = '定时'): Promise<string> {
  const s = store.schedule
  if (!sender) throw new Error('发送器未就绪')
  if (running) throw new Error('上一次任务还在运行中')

  running = true
  try {
    const emps = store.employees
    if (!emps.length) return finish(`${reason}执行跳过：尚未导入工资表`)

    // 发送前体检：有问题时按配置决定取消还是照发
    const month = monthOf(emps[0].sheet)
    const rep = checkEmployees(emps, store.prevSnapshot(month))
    const errs = rep.issues.filter((i) => i.level === 'error')
    if (errs.length && s.onError === 'abort') {
      return finish(`${reason}执行已取消（体检未通过）：${errs.map((i) => i.text).join('；')}`)
    }

    const j = await sender(!s.skipSent)
    lastJobId = j.id
    return finish(`${reason}执行完成：成功 ${j.success}，失败 ${j.failed}，跳过 ${j.skipped}`)
  } catch (e: any) {
    return finish(`${reason}执行失败：${e?.message ?? String(e)}`)
  } finally {
    running = false
  }
}

function finish(result: string) {
  store.setScheduleRun({ result })
  return result
}

/** 每 20 秒看一次是否到点；错过超过 1 小时就不再补发（避免半夜开机狂发） */
async function tick() {
  const s = store.schedule
  if (!s.enabled || !sender || running) return
  const now = new Date()
  const due = lastDueAt(s, now)
  if (!due) return
  const key = due.toISOString()
  if (store.scheduleRunKey === key) return
  if (now.getTime() - due.getTime() > 60 * 60 * 1000) {
    store.setScheduleRun({
      key,
      result: `已跳过：计划 ${fmt(due)} 执行，但那时服务没运行（超过 1 小时不再补发）`,
    })
    return
  }
  await runScheduled('定时')
}

export function initScheduler(send: Sender, intervalMs = 20_000) {
  sender = send
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    tick().catch(() => undefined)
  }, intervalMs)
  // 启动时先判断一次：服务在计划时间之后才开起来，1 小时内会补发
  tick().catch(() => undefined)
}

export function scheduleState(): ScheduleState {
  const s = store.schedule
  const next = nextRunAt(s)
  return {
    ...s,
    nextRun: s.enabled && next ? next.toISOString() : null,
    lastRun: store.scheduleLastRun,
    lastResult: store.scheduleLastResult,
    running,
    jobId: lastJobId,
  }
}

/** 校验并保存配置 */
export function saveSchedule(patch: Partial<Schedule>): ScheduleState {
  const cur = store.schedule
  const next: Partial<Schedule> = {}
  if (patch.enabled !== undefined) next.enabled = !!patch.enabled
  if (patch.day !== undefined) {
    if (patch.day === 'last') next.day = 'last'
    else {
      const d = Number(patch.day)
      if (!Number.isInteger(d) || d < 1 || d > 31) throw new Error('日期必须是 1-31 或「每月最后一天」')
      next.day = d
    }
  }
  if (patch.hour !== undefined) next.hour = clamp(patch.hour, 0, 23)
  if (patch.minute !== undefined) next.minute = clamp(patch.minute, 0, 59)
  if (patch.skipSent !== undefined) next.skipSent = !!patch.skipSent
  if (patch.onError !== undefined) next.onError = patch.onError === 'send' ? 'send' : 'abort'
  void cur
  store.setSchedule(next)
  return scheduleState()
}

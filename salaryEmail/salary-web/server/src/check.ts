import { mainValue } from './render'
import type { CheckIssue, CheckReport, Employee, MonthSnapshot } from '../../shared/types'

/** 从表名里提取月份（2026年10月 / 2026-10 → 2026-10），识别不出来返回 '' */
export function monthOf(sheet: string) {
  const m = sheet.match(/(\d{4})\s*[年\-/]\s*(\d{1,2})/)
  return m ? `${m[1]}-${Number(m[2])}` : ''
}

/** '1,200' / '¥1200' / '' → number | null */
export function toNumber(v: string): number | null {
  const s = String(v ?? '')
    .replace(/[,\s¥￥]/g, '')
    .trim()
  if (!s) return null
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

function names(list: Employee[], ids: string[]) {
  const set = new Set(ids)
  const arr = list.filter((e) => set.has(e.id)).map((e) => e.name || '(无姓名)')
  const head = arr.slice(0, 5).join('、')
  return arr.length > 5 ? `${head} 等 ${arr.length} 人` : head
}

/**
 * 发送前体检：把「发出去才发现的错」提前拦下来。
 * 只做检查、不改数据；error 级问题建议阻断，warn 级只是提醒。
 */
export function checkEmployees(list: Employee[], prev?: MonthSnapshot | null): CheckReport {
  const issues: CheckIssue[] = []
  const stats = {
    total: list.length,
    noEmail: 0,
    invalidEmail: 0,
    dupEmail: 0,
    dupPerson: 0,
    zeroTotal: 0,
    negative: 0,
    amount: 0,
    month: list.length ? monthOf(list[0].sheet) : '',
  }
  const compare = prev ? { prevMonth: prev.month, prevCount: prev.count, prevAmount: prev.amount } : undefined

  if (!list.length) {
    issues.push({ level: 'error', kind: 'no-data', text: '尚未导入工资表，请先导入' })
    return { ok: false, issues, stats, compare }
  }

  // 1) 缺邮箱 / 邮箱格式不对
  const noEmail: string[] = []
  const invalid: string[] = []
  for (const e of list) {
    if (!e.email.trim()) noEmail.push(e.id)
    else if (!e.valid) invalid.push(e.id)
  }
  stats.noEmail = noEmail.length
  stats.invalidEmail = invalid.length
  if (noEmail.length)
    issues.push({
      level: 'error',
      kind: 'no-email',
      text: `${noEmail.length} 人没有邮箱（${names(list, noEmail)}），这些人不会发出去`,
      ids: noEmail,
    })
  if (invalid.length)
    issues.push({
      level: 'error',
      kind: 'invalid-email',
      text: `${invalid.length} 人邮箱格式不正确（${names(list, invalid)}）`,
      ids: invalid,
    })

  // 2) 重复邮箱：多人共用一个邮箱，会收到多份工资条
  const byEmail = new Map<string, string[]>()
  for (const e of list) {
    const k = e.email.trim().toLowerCase()
    if (!k) continue
    byEmail.set(k, [...(byEmail.get(k) ?? []), e.id])
  }
  const dupEmailIds = [...byEmail.values()].filter((a) => a.length > 1).flat()
  stats.dupEmail = dupEmailIds.length
  if (dupEmailIds.length)
    issues.push({
      level: 'warn',
      kind: 'dup-email',
      text: `${dupEmailIds.length} 人共用了同一个邮箱（${names(list, dupEmailIds)}），同一邮箱会收到多封`,
      ids: dupEmailIds,
    })

  // 3) 重复人员：同姓名 + 同工号出现多次（多半是表里重复行）
  const byPerson = new Map<string, string[]>()
  for (const e of list) {
    const k = `${e.name.trim()}||${(e.empNo ?? '').trim()}`
    byPerson.set(k, [...(byPerson.get(k) ?? []), e.id])
  }
  const dupPersonIds = [...byPerson.values()].filter((a) => a.length > 1).flat()
  stats.dupPerson = dupPersonIds.length
  if (dupPersonIds.length)
    issues.push({
      level: 'warn',
      kind: 'dup-person',
      text: `有 ${dupPersonIds.length} 条重复人员记录（${names(list, dupPersonIds)}），请确认是否重复导入`,
      ids: dupPersonIds,
    })

  // 4) 主数值异常：实发为 0 / 负数项
  const zero: string[] = []
  const neg: string[] = []
  for (const e of list) {
    const v = toNumber(mainValue(e))
    if (v !== null) stats.amount += v
    if (v === 0) zero.push(e.id)
    if (e.items.some((i) => (toNumber(i.value) ?? 0) < 0)) neg.push(e.id)
  }
  stats.zeroTotal = zero.length
  stats.negative = neg.length
  if (zero.length)
    issues.push({
      level: 'warn',
      kind: 'zero-total',
      text: `${zero.length} 人实发为 0（${names(list, zero)}），请确认是否算错`,
      ids: zero,
    })
  if (neg.length)
    issues.push({
      level: 'warn',
      kind: 'negative',
      text: `${neg.length} 人存在负数金额（${names(list, neg)}）`,
      ids: neg,
    })

  // 5) 与上一期对比：人数 / 金额大幅变化多半是导入错了表
  if (prev) {
    const dc = stats.total - prev.count
    if (prev.count > 0 && Math.abs(dc) / prev.count > 0.2)
      issues.push({
        level: 'warn',
        kind: 'count-diff',
        text: `人数比 ${prev.month} 变化 ${dc > 0 ? '+' : ''}${dc} 人（${prev.count} → ${stats.total}），请确认导入的是本月的表`,
      })
    if (prev.amount > 0 && Math.abs(stats.amount - prev.amount) / prev.amount > 0.3)
      issues.push({
        level: 'warn',
        kind: 'amount-diff',
        text: `实发合计比 ${prev.month} 变化超过 30%（${Math.round(prev.amount)} → ${Math.round(stats.amount)}）`,
      })
  }

  // error 排前面
  issues.sort((a, b) => (a.level === b.level ? 0 : a.level === 'error' ? -1 : 1))
  return { ok: !issues.some((i) => i.level === 'error'), issues, stats, compare }
}

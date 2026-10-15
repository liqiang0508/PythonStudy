import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { DATA_DIR, DEFAULT_CONTACTS_FILE } from './config'
import type {
  Contact,
  ContactInput,
  Employee,
  LogEntry,
  MonthSnapshot,
  Schedule,
  SendStatus,
} from '../../shared/types'

const DB_FILE = path.join(DATA_DIR, 'db.json')

export interface LastStatus {
  status: SendStatus
  error?: string
  time: string
  sheet: string
}

interface DB {
  employees: Employee[]
  logs: LogEntry[]
  contacts: Contact[]
  /** 通讯录导入时的表头顺序，展示与导出都沿用 */
  contactColumns: string[]

  /** 最近一次导入的通讯录文件名 */
  contactsSource: string | null
  contactsImportedAt: string | null
  source: string | null
  importedAt: string | null
  /** 定时发送配置 */
  schedule: Schedule | null
  scheduleLastRun: string | null
  scheduleLastResult: string | null
  /** 已执行过的定时时间点（ISO），防止重启后重复发 */
  scheduleRunKey: string | null
  /** 每月快照：{ '2026-10': {...} }，用于体检时和上一期对比 */
  snapshots: Record<string, MonthSnapshot>
}

export const DEFAULT_SCHEDULE: Schedule = {
  enabled: false,
  day: 10,
  hour: 9,
  minute: 0,
  skipSent: true,
  onError: 'abort',
}

const empty = (): DB => ({
  employees: [],
  logs: [],
  contacts: [],
  contactColumns: [],
  contactsSource: null,
  contactsImportedAt: null,
  source: null,
  importedAt: null,
  schedule: null,
  scheduleLastRun: null,
  scheduleLastResult: null,
  scheduleRunKey: null,
  snapshots: {},
})

let db: DB = empty()

/**
 * 还原被 latin1 误解码的中文文件名。
 * 旧版本 multer 拿到的是「UTF-8 字节按 latin1 解码」的字符串（「年」会变成 å¹´ 三个字符），
 * 这些字符码点都 <= 0xFF；已经是正确的中文（码点 > 0xFF）则原样返回。
 */
function fixMojibake(s: string) {
  for (const ch of s) if (ch.codePointAt(0)! > 0xff) return s
  return Buffer.from(s, 'latin1').toString('utf8')
}

function load() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  if (fs.existsSync(DB_FILE)) {
    try {
      db = { ...empty(), ...JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) }
      // 旧版本存进去的中文文件名是 latin1 乱码，读出来时顺手还原
      if (db.source) db.source = fixMojibake(db.source)
      if (db.contactsSource) db.contactsSource = fixMojibake(db.contactsSource)
    } catch {
      db = empty()
    }
  }
}

function persist() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8')
}

load()

export const store = {
  get employees() {
    return db.employees
  },
  get logs() {
    return db.logs
  },
  get contacts() {
    return db.contacts
  },
  get contactColumns() {
    return db.contactColumns
  },
  setContactColumns(cols: string[]) {
    db.contactColumns = cols
    persist()
  },
  /** 最近一次导入的通讯录来源（文件名 + 时间） */
  get contactsMeta() {
    return { source: db.contactsSource, importedAt: db.contactsImportedAt }
  },
  setContactsMeta(source: string) {
    db.contactsSource = source
    db.contactsImportedAt = new Date().toISOString()
    persist()
  },
  get meta() {
    return { source: db.source, importedAt: db.importedAt }
  },

  setEmployees(list: Employee[], source: string) {
    db.employees = list
    db.source = source
    db.importedAt = new Date().toISOString()
    persist()
  },

  clearEmployees() {
    db.employees = []
    db.source = null
    db.importedAt = null
    persist()
  },

  // ---------------- 定时发送 ----------------
  get schedule(): Schedule {
    return { ...DEFAULT_SCHEDULE, ...(db.schedule ?? {}) }
  },
  setSchedule(patch: Partial<Schedule>) {
    db.schedule = { ...this.schedule, ...patch }
    persist()
    return db.schedule as Schedule
  },
  get scheduleLastRun() {
    return db.scheduleLastRun
  },
  get scheduleLastResult() {
    return db.scheduleLastResult
  },
  get scheduleRunKey() {
    return db.scheduleRunKey
  },
  /** 记录一次定时执行结果；key 相同的时间点不会重复执行 */
  setScheduleRun(p: { key?: string; result: string }) {
    if (p.key) db.scheduleRunKey = p.key
    db.scheduleLastRun = new Date().toISOString()
    db.scheduleLastResult = p.result
    persist()
  },

  // ---------------- 每月快照（体检对比用） ----------------
  addSnapshot(month: string, count: number, amount: number) {
    if (!month) return
    db.snapshots[month] = { month, count, amount, at: new Date().toISOString() }
    // 只保留最近 24 期
    const keys = Object.keys(db.snapshots).sort(monthKey).reverse()
    if (keys.length > 24) {
      db.snapshots = Object.fromEntries(keys.slice(0, 24).map((k) => [k, db.snapshots[k]]))
    }
    persist()
  },
  /** 上一个月的快照 */
  prevSnapshot(month: string): MonthSnapshot | null {
    if (!month) return null
    const cur = monthKey(month)
    let best: MonthSnapshot | null = null
    for (const s of Object.values(db.snapshots)) {
      const k = monthKey(s.month)
      if (k >= cur) continue
      if (!best || k > monthKey(best.month)) best = s
    }
    return best
  },

  find(id: string) {
    return db.employees.find((e) => e.id === id)
  },

  addLogs(entries: Omit<LogEntry, 'id'>[]) {
    const rows = entries.map((e) => ({ ...e, id: crypto.randomUUID() }))
    db.logs = [...rows.reverse(), ...db.logs].slice(0, 5000)
    persist()
    return rows
  },

  /**
   * 每个人最近一次发送结果。
   * 按「工号 → 姓名+邮箱」两种键都能查到：重新导入（id 变了、表名改了）或重启后依然认得出。
   */
  lastStatusMap(): Map<string, LastStatus> {
    const map = new Map<string, LastStatus>()
    const put = (key: string, v: LastStatus) => {
      if (key && !map.has(key)) map.set(key, v)
    }
    for (const l of db.logs) {
      const v: LastStatus = { status: l.status, error: l.error, time: l.time, sheet: l.sheet }
      put(statusKey(l), v)
      if (l.empNo) put(empNoKey(l.empNo), v)
    }
    return map
  },

  // ---------------- 通讯录 ----------------
  addContact(input: ContactInput): Contact {
    const c: Contact = { ...input, id: crypto.randomUUID() }
    db.contacts.push(c)
    persist()
    return c
  },

  updateContact(id: string, patch: Partial<ContactInput>) {
    const i = db.contacts.findIndex((c) => c.id === id)
    if (i < 0) return null
    db.contacts[i] = { ...db.contacts[i], ...patch }
    persist()
    return db.contacts[i]
  },

  removeContact(id: string) {
    db.contacts = db.contacts.filter((c) => c.id !== id)
    persist()
  },

  setContacts(list: Contact[]) {
    db.contacts = list
    persist()
  },
}

/** '2026-10' → 2026*12+10，用于比较月份先后 */
function monthKey(m: string) {
  const [y, mo] = String(m).split('-').map(Number)
  if (!y || !mo) return 0
  return y * 12 + mo
}

/** 主键：姓名 + 邮箱（与工作表名无关，重新导入/重启都能对上） */
export function statusKey(e: Pick<Employee, 'name' | 'email'>) {
  return `${e.name.trim()}||${e.email.trim().toLowerCase()}`
}

/** 备选键：工号（改名或换邮箱后仍认得出） */
export function empNoKey(empNo: string) {
  return `no:${empNo.trim()}`
}

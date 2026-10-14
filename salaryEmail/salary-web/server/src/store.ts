import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { DATA_DIR, DEFAULT_CONTACTS_FILE } from './config'
import type { Contact, ContactInput, Employee, LogEntry, SendStatus } from '../../shared/types'

const DB_FILE = path.join(DATA_DIR, 'db.json')

interface DB {
  employees: Employee[]
  logs: LogEntry[]
  contacts: Contact[]
  /** 通讯录导入时的表头顺序，展示与导出都沿用 */
  contactColumns: string[]
  /** 通讯录同步的本地 Excel 路径；null = 用默认位置 */
  contactsFile: string | null
  source: string | null
  importedAt: string | null
}

const empty = (): DB => ({
  employees: [],
  logs: [],
  contacts: [],
  contactColumns: [],
  contactsFile: null,
  source: null,
  importedAt: null,
})

let db: DB = empty()

function load() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  if (fs.existsSync(DB_FILE)) {
    try {
      db = { ...empty(), ...JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) }
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
  /** 通讯录同步的 Excel 绝对路径 */
  get contactsFile() {
    return db.contactsFile ?? DEFAULT_CONTACTS_FILE
  },
  setContactsFile(file: string | null) {
    db.contactsFile = file && file !== DEFAULT_CONTACTS_FILE ? file : null
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

  find(id: string) {
    return db.employees.find((e) => e.id === id)
  },

  addLogs(entries: Omit<LogEntry, 'id'>[]) {
    const rows = entries.map((e) => ({ ...e, id: crypto.randomUUID() }))
    db.logs = [...rows.reverse(), ...db.logs].slice(0, 5000)
    persist()
    return rows
  },

  /** 每个人最近一次发送结果 */
  lastStatusMap(): Map<string, { status: SendStatus; error?: string }> {
    const map = new Map<string, { status: SendStatus; error?: string }>()
    for (const l of db.logs) {
      const key = `${l.sheet}||${l.name.trim()}||${l.email.trim().toLowerCase()}`
      if (!map.has(key)) map.set(key, { status: l.status, error: l.error })
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

export function statusKey(e: Pick<Employee, 'sheet' | 'name' | 'email'>) {
  return `${e.sheet}||${e.name.trim()}||${e.email.trim().toLowerCase()}`
}

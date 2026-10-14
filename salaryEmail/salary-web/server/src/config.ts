import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import type { Settings, SettingsView } from '../../shared/types'

export const DATA_DIR = path.resolve(process.cwd(), 'server', 'data')
/** 通讯录同步的本地 Excel 默认位置（可在界面上改成自己的文件） */
export const DEFAULT_CONTACTS_FILE = path.join(DATA_DIR, '通讯录.xlsx')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')
const SECRET_FILE = path.join(DATA_DIR, '.session-secret')

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

export const DEFAULT_SETTINGS: Settings = {
  smtpHost: 'smtp.qq.com',
  smtpPort: 465,
  secure: true,
  allowInsecureTLS: false,
  smtpUser: '',
  smtpPass: '',
  senderName: '人事部',
  subjectTemplate: '{sheet} 工资条',
  bcc: '',
  retry: 2,
  delayMs: 1000,
  nameColumn: '姓名',
  emailColumn: '邮箱',
  useContacts: true,
  empNoColumn: '工号',
}

let cache: Settings | null = null

export function loadSettings(): Settings {
  if (cache) return cache
  ensureDir()
  let file: Partial<Settings> = {}
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      file = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'))
    } catch {
      file = {}
    }
  }
  const s: Settings = { ...DEFAULT_SETTINGS, ...file }
  // 环境变量优先级最高
  if (process.env.SMTP_HOST) s.smtpHost = process.env.SMTP_HOST
  if (process.env.SMTP_PORT) s.smtpPort = Number(process.env.SMTP_PORT)
  if (process.env.SMTP_SECURE) s.secure = process.env.SMTP_SECURE === 'true'
  if (process.env.SMTP_USER) s.smtpUser = process.env.SMTP_USER
  if (process.env.SMTP_PASS) s.smtpPass = process.env.SMTP_PASS
  cache = s
  return s
}

export function saveSettings(next: Settings) {
  ensureDir()
  cache = next
  // 环境变量固定项不落盘，避免误以为修改生效
  const persist = { ...next }
  if (process.env.SMTP_PASS) persist.smtpPass = ''
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(persist, null, 2), 'utf-8')
}

export function toView(s: Settings): SettingsView {
  const { smtpPass, ...rest } = s
  return { ...rest, smtpPassSet: !!smtpPass }
}

export function getWebPassword(): string {
  return (process.env.WEB_PASSWORD || '').trim()
}

export function getSessionSecret(): string {
  ensureDir()
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET
  if (fs.existsSync(SECRET_FILE)) return fs.readFileSync(SECRET_FILE, 'utf-8').trim()
  const secret = crypto.randomBytes(32).toString('hex')
  fs.writeFileSync(SECRET_FILE, secret, 'utf-8')
  return secret
}

export const MASK = '••••••••'

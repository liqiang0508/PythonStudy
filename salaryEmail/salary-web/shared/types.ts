export interface SalaryItem {
  /** 项目名，已去掉 <b> 标记 */
  key: string
  /** 展示值 */
  value: string
  /** 是否加粗（合计/实发等） */
  bold: boolean
}

/** 邮箱来源：通讯录匹配 / 表格自带 / 手动填写 / 未匹配 */
export type EmailSource = 'contact' | 'sheet' | 'manual' | 'none'

export interface Employee {
  id: string
  sheet: string
  name: string
  email: string
  /** 邮箱格式是否合法 */
  valid: boolean
  items: SalaryItem[]
  emailSource?: EmailSource
  /** 表格里自带的邮箱，通讯录匹配失败时的兜底 */
  sheetEmail?: string
  /** 表格里的工号（自动识别「工号/员工号/编号」列），用于同名区分 */
  empNo?: string
}

export type SendStatus = 'success' | 'failed' | null

export interface EmployeeSummary {
  id: string
  sheet: string
  name: string
  email: string
  valid: boolean
  /** 实发金额等主数值，便于列表核对 */
  total: string
  lastStatus: SendStatus
  lastError?: string
  /** 上次发送时间（用于提示） */
  lastTime?: string
  emailSource: EmailSource
}

/** 通讯录中的员工档案 */
export interface Contact {
  id: string
  name: string
  email: string
  /** 工号，优先用于匹配 */
  empNo: string
  department: string
  active: boolean
  note: string
  /** 导入表里除标准列以外的自定义列，导出时原样带回 */
  extra?: Record<string, string>
}

export type ContactInput = Omit<Contact, 'id'>

/** 通讯录写回本地 Excel 的结果 */
export interface SyncState {
  ok: boolean
  /** 写回的文件绝对路径 */
  file: string
  error?: string
  added?: number
  updated?: number
  removed?: number
}

export interface LogEntry {
  id: string
  time: string
  batchId: string
  sheet: string
  name: string
  email: string
  /** 工号，改名/换邮箱后也能认出同一个人 */
  empNo?: string
  status: 'success' | 'failed'
  error?: string
}

export interface Settings {
  smtpHost: string
  smtpPort: number
  secure: boolean
  /** 自签名证书时开启 */
  allowInsecureTLS: boolean
  smtpUser: string
  smtpPass: string
  senderName: string
  subjectTemplate: string
  bcc: string
  retry: number
  delayMs: number
  nameColumn: string
  emailColumn: string
  /** 导入工资表时用通讯录匹配邮箱 */
  useContacts: boolean
  /** 工资表中工号所在列名：同名时用它区分；姓名没匹配上时也用它兜底 */
  empNoColumn: string
}

export type SettingsView = Omit<Settings, 'smtpPass'> & { smtpPassSet: boolean }

export interface ImportResult {
  file: string
  sheetCount: number
  headers: string[]
  nameColumn: string
  emailColumn: string
  /** 实际用到的工号列名 */
  empNoColumn: string
  warnings: string[]
  employees: EmployeeSummary[]
  /** 未匹配到邮箱的人数 */
  unmatched: number
}

export interface JobResultItem {
  id: string
  name: string
  email: string
  ok: boolean
  skipped?: boolean
  error?: string
}

// ------------------------------------------------------------------ 发送前体检
export type CheckLevel = 'error' | 'warn'

export interface CheckIssue {
  level: CheckLevel
  /** 问题类型，便于界面/程序区分 */
  kind:
    | 'no-data'
    | 'no-email'
    | 'invalid-email'
    | 'dup-email'
    | 'dup-person'
    | 'zero-total'
    | 'negative'
    | 'count-diff'
    | 'amount-diff'
  text: string
  /** 相关人员 id，界面可据此定位 */
  ids?: string[]
}

/** 每月快照：用于与上一期对比 */
export interface MonthSnapshot {
  month: string
  count: number
  amount: number
  at: string
}

export interface CheckReport {
  /** 没有 error 级问题 */
  ok: boolean
  issues: CheckIssue[]
  stats: {
    total: number
    noEmail: number
    invalidEmail: number
    dupEmail: number
    dupPerson: number
    zeroTotal: number
    negative: number
    /** 主数值合计 */
    amount: number
    month: string
  }
  /** 与上一期快照的对比（有历史数据时才给） */
  compare?: {
    prevMonth: string
    prevCount: number
    prevAmount: number
  }
}

// ------------------------------------------------------------------ 定时发送
export interface Schedule {
  enabled: boolean
  /** 每月几号执行；'last' = 每月最后一天 */
  day: number | 'last'
  hour: number
  minute: number
  /** 跳过已发送成功的人（避免重复打扰） */
  skipSent: boolean
  /** 体检不通过时：abort=取消发送，send=照常发送 */
  onError: 'abort' | 'send'
}

export interface ScheduleState extends Schedule {
  /** 下次运行时间（ISO），未启用为 null */
  nextRun: string | null
  lastRun: string | null
  lastResult: string | null
  running: boolean
  /** 最近一次定时任务对应的发送任务 id，可用于查进度 */
  jobId: string | null
}

export interface JobStatus {
  id: string
  state: 'running' | 'done' | 'cancelled'
  total: number
  done: number
  success: number
  failed: number
  skipped: number
  startedAt: number
  results: JobResultItem[]
}

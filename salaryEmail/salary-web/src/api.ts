import type {
  Contact,
  ContactInput,
  EmployeeSummary,
  ImportResult,
  JobStatus,
  LogEntry,
  SettingsView,
  SyncState,
} from '../shared/types'

async function req<T>(url: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    credentials: 'same-origin',
    ...init,
    headers: init.body instanceof FormData ? undefined : { 'Content-Type': 'application/json' },
  })
  const text = await res.text()
  let data: any = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  if (!res.ok) throw new Error(data?.error || `请求失败 (${res.status})`)
  return data as T
}

export interface Meta {
  source: string | null
  importedAt: string | null
}

export const api = {
  authState: () => req<{ needPassword: boolean; loggedIn: boolean }>('/api/auth/state'),
  login: (password: string) =>
    req<{ ok: boolean; error?: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),
  logout: () => req<{ ok: boolean }>('/api/auth/logout', { method: 'POST' }),

  settings: () => req<SettingsView>('/api/settings'),
  saveSettings: (body: Record<string, unknown>) =>
    req<SettingsView>('/api/settings', { method: 'PUT', body: JSON.stringify(body) }),
  testMail: (to: string) =>
    req<{ ok: boolean }>('/api/settings/test', { method: 'POST', body: JSON.stringify({ to }) }),

  importFile: (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    return req<ImportResult>('/api/import', { method: 'POST', body: fd })
  },
  reparse: (cols: { nameColumn: string; emailColumn: string; empNoColumn: string }) =>
    req<ImportResult>('/api/import/reparse', {
      method: 'POST',
      body: JSON.stringify(cols),
    }),

  employees: () => req<{ employees: EmployeeSummary[]; meta: Meta }>('/api/employees'),
  render: (id: string) =>
    req<{ subject: string; html: string; text: string }>(`/api/employees/${id}/render`),
  clear: () => req<{ ok: boolean }>('/api/employees', { method: 'DELETE' }),
  bindEmail: (id: string, payload: { email?: string; contactId?: string }) =>
    req<{ ok: boolean; employee: EmployeeSummary }>('/api/employees/bind', {
      method: 'POST',
      body: JSON.stringify({ id, ...payload }),
    }),
  resolveEmails: () =>
    req<{ employees: EmployeeSummary[]; warnings: string[]; unmatched: number }>(
      '/api/employees/resolve',
      { method: 'POST' },
    ),

  contacts: () =>
    req<{ contacts: Contact[]; columns: string[]; file: string }>('/api/contacts'),
  addContact: (body: ContactInput) =>
    req<{ contact: Contact; sync: SyncState }>('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  updateContact: (id: string, body: ContactInput) =>
    req<{ contact: Contact; sync: SyncState }>(`/api/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  removeContact: (id: string) =>
    req<{ ok: boolean; sync: SyncState }>(`/api/contacts/${id}`, { method: 'DELETE' }),
  importContacts: (file: File, mode: string) => {
    const fd = new FormData()
    fd.append('mode', mode) // 字段要在文件之前，multer 才能读到
    fd.append('file', file)
    return req<{
      added: number
      updated: number
      skipped: number
      disabled: number
      removed: number
      mode: string
      warnings: string[]
      contacts: Contact[]
      columns: string[]
      sync: SyncState
    }>('/api/contacts/import', { method: 'POST', body: fd })
  },
  /** 绑定本机的通讯录 Excel：之后界面上的改动就写回这个文件 */
  setContactsFile: (p: string) =>
    req<{ file: string; sync: SyncState }>('/api/contacts/file', {
      method: 'PUT',
      body: JSON.stringify({ path: p }),
    }),
  syncContacts: () => req<{ file: string; sync: SyncState }>('/api/contacts/sync', { method: 'POST' }),
  revealContactsFile: () => req<{ ok: boolean; file: string }>('/api/contacts/reveal', { method: 'POST' }),

  send: (ids: string[], force: boolean) =>
    req<{ jobId: string }>('/api/send', { method: 'POST', body: JSON.stringify({ ids, force }) }),
  job: (id: string) => req<JobStatus>(`/api/job/${id}`),
  cancelJob: (id: string) => req<{ ok: boolean }>(`/api/job/${id}/cancel`, { method: 'POST' }),

  logs: () => req<{ logs: LogEntry[] }>('/api/logs'),
}

export const templateUrl = '/api/template'
export const exportLogUrl = '/api/logs/export'
export const exportContactsUrl = '/api/contacts/export'

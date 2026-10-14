import nodemailer, { type Transporter } from 'nodemailer'
import type { Settings } from '../../shared/types'

export function createTransport(s: Settings): Transporter {
  return nodemailer.createTransport({
    host: s.smtpHost,
    port: Number(s.smtpPort),
    secure: !!s.secure,
    auth: { user: s.smtpUser, pass: s.smtpPass },
    tls: { rejectUnauthorized: !s.allowInsecureTLS },
    pool: true,
    maxConnections: 1,
    maxMessages: 100,
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 30000,
  })
}

export async function verifyConnection(s: Settings) {
  const t = createTransport(s)
  try {
    await t.verify()
    return { ok: true as const }
  } catch (e: any) {
    return { ok: false as const, error: normalizeError(e) }
  } finally {
    t.close()
  }
}

export interface SendOptions {
  from: { name: string; address: string }
  to: string
  bcc?: string[]
  subject: string
  html: string
  text: string
}

export function splitAddresses(v: string): string[] {
  return (v || '')
    .split(/[,;，；\s]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export async function sendMail(t: Transporter, o: SendOptions) {
  await t.sendMail({
    from: o.from.name ? `"${o.from.name}" <${o.from.address}>` : o.from.address,
    to: o.to,
    bcc: o.bcc?.length ? o.bcc.join(', ') : undefined,
    subject: o.subject,
    html: o.html,
    text: o.text,
  })
}

export function normalizeError(e: any): string {
  const code = e?.responseCode ? `(${e.responseCode}) ` : ''
  const msg = e?.response || e?.message || String(e)
  return `${code}${msg}`
}

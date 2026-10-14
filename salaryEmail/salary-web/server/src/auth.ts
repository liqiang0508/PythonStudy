import crypto from 'node:crypto'
import type { NextFunction, Request, Response } from 'express'
import { getSessionSecret, getWebPassword } from './config'

const COOKIE = 'salary_sid'
const MAX_AGE = 7 * 24 * 3600

function sign(payload: string) {
  return crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex')
}

function makeToken() {
  const exp = String(Date.now() + MAX_AGE * 1000)
  return `${exp}.${sign(exp)}`
}

function valid(token?: string) {
  if (!token) return false
  const [exp, mac] = token.split('.')
  if (!exp || !mac) return false
  if (Number(exp) < Date.now()) return false
  const expect = sign(exp)
  return mac.length === expect.length && crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expect))
}

export function authEnabled() {
  return !!getWebPassword()
}

export function isLoggedIn(req: Request) {
  return valid(req.cookies?.[COOKIE])
}

export function login(res: Response, password: string) {
  const expected = getWebPassword()
  if (!expected) return true
  const a = Buffer.from(password)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false
  res.cookie(COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: MAX_AGE * 1000,
    path: '/',
  })
  return true
}

export function logout(res: Response) {
  res.clearCookie(COOKIE, { path: '/' })
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!authEnabled()) return next()
  if (req.path.startsWith('/auth')) return next()
  if (isLoggedIn(req)) return next()
  res.status(401).json({ error: '未登录或登录已过期' })
}

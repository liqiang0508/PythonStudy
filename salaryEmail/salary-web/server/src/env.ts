import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

const abs = (f: string) => path.resolve(process.cwd(), f)

// 先加载公共 .env（里面可能写着 APP_ENV）
if (fs.existsSync(abs('.env'))) dotenv.config({ path: abs('.env'), override: true })

/** 环境名：命令行 APP_ENV > .env 里的 APP_ENV > NODE_ENV > development */
function envName(): string {
  const s = (process.env.APP_ENV || process.env.NODE_ENV || '').trim().toLowerCase()
  if (!s || s === 'dev' || s === 'develop') return 'development'
  return s
}

export const APP_ENV = envName()

/**
 * 加载顺序（后者覆盖前者）：
 *   .env  →  .env.{环境}  →  .env.local
 * .env.{环境} 与 vite 的 --mode 同命名：
 *   npm run dev        → .env.development
 *   NODE_ENV=production→ .env.production
 * 命令行 / 系统里显式设置的变量优先级最高。
 */
const files = ['.env', `.env.${APP_ENV}`, '.env.local']
const shellEnv = { ...process.env }
for (const f of files) if (fs.existsSync(abs(f))) dotenv.config({ path: abs(f), override: true })
for (const [k, v] of Object.entries(shellEnv)) {
  if (v !== undefined && process.env[k] !== v) process.env[k] = v
}

/** 实际生效的文件（启动日志会打印，方便确认） */
export const loadedEnvFiles = files.filter((f) => fs.existsSync(abs(f)))

import fs from 'node:fs'
import path from 'node:path'
import ExcelJS from 'exceljs'
import type { Contact, SyncState } from '../../shared/types'
import { DEFAULT_CONTACTS_FILE } from './config'
import {
  DEPT_RE,
  EMPNO_RE,
  EMAIL_COL_RE,
  NAME_RE,
  NOTE_RE,
  STATUS_RE,
  cellText,
} from './excel'

const FALLBACK_COLUMNS = ['工号', '姓名', '邮箱', '部门', '在职', '备注']
const SYNC_SHEET = '通讯录'

/** 某个表头列对应的员工字段；返回 null 表示这列不由通讯录维护，不要动 */
function cellOf(c: Contact, col: string): string | null {
  if (EMPNO_RE.test(col)) return c.empNo
  if (NAME_RE.test(col)) return c.name
  if (EMAIL_COL_RE.test(col)) return c.email
  if (DEPT_RE.test(col)) return c.department
  if (NOTE_RE.test(col)) return c.note
  if (STATUS_RE.test(col)) return c.active ? '是' : '否'
  const extra = c.extra?.[col]
  return extra === undefined ? null : extra
}

/** 找到表头所在行（前几行里出现「姓名」的那一行） */
function findHeader(ws: ExcelJS.Worksheet): { idx: number; headers: string[] } | null {
  const max = Math.min(ws.rowCount, 6)
  for (let i = 1; i <= max; i++) {
    const row = ws.getRow(i)
    const vals: string[] = []
    for (let j = 1; j <= Math.max(ws.columnCount, 1); j++)
      vals.push(cellText(row.getCell(j).value))
    if (vals.some((v) => NAME_RE.test(v))) return { idx: i, headers: vals }
  }
  return null
}

function pickSheet(wb: ExcelJS.Workbook) {
  return (
    wb.worksheets.find((s) => s.name === SYNC_SHEET) ??
    wb.worksheets.find((s) => !!findHeader(s)) ??
    wb.worksheets[0]
  )
}

function newSheet(wb: ExcelJS.Workbook, columns: string[]) {
  const ws = wb.addWorksheet(SYNC_SHEET)
  const cols = columns.length ? columns : FALLBACK_COLUMNS
  ws.columns = cols.map((c) => ({ header: c, width: c.length > 4 ? 24 : 12 }))
  ws.getRow(1).font = { bold: true }
  ws.views = [{ state: 'frozen', ySplit: 1 }]
  return { ws, idx: 1, headers: cols }
}

function csvQuote(s: string) {
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/**
 * 把通讯录写回本地 Excel：以界面上的数据为准覆盖表格。
 * 只改「通讯录」工作表的数据行，其它工作表、格式、公式所在列尽量保持不动。
 */
export async function syncContactsFile(
  file: string,
  contacts: Contact[],
  columns: string[],
): Promise<SyncState> {
  const target = path.resolve(file || DEFAULT_CONTACTS_FILE)
  const ext = path.extname(target).toLowerCase()
  const cols = columns.length ? columns : FALLBACK_COLUMNS

  try {
    fs.mkdirSync(path.dirname(target), { recursive: true })

    if (ext === '.csv') {
      const lines = [
        cols.map(csvQuote).join(','),
        ...contacts.map((c) => cols.map((col) => csvQuote(cellOf(c, col) ?? '')).join(',')),
      ]
      fs.writeFileSync(target, `﻿${lines.join('\r\n')}\r\n`, 'utf-8')
      return { ok: true, file: target, added: contacts.length, updated: 0, removed: 0 }
    }

    const wb = new ExcelJS.Workbook()
    if (fs.existsSync(target)) {
      try {
        await wb.xlsx.readFile(target)
      } catch {
        // 读不了（不是 xlsx / 已损坏）就当新文件处理
      }
    }

    let ws = pickSheet(wb)
    let header = ws ? findHeader(ws) : null
    if (!ws || !header) {
      const fresh = newSheet(wb, cols)
      ws = fresh.ws
      header = { idx: fresh.idx, headers: fresh.headers }
    }
    const headers = header.headers
    const nameIdx = headers.findIndex((h) => NAME_RE.test(h))
    const empNoIdx = headers.findIndex((h) => EMPNO_RE.test(h))
    if (nameIdx < 0) {
      return { ok: false, file: target, error: `表格里没有「姓名」列，无法写回（${target}）` }
    }

    let added = 0
    let updated = 0
    let removed = 0

    // 现有数据行：按工号/姓名索引
    const rows: Array<{ num: number; empNo: string; name: string }> = []
    for (let i = header.idx + 1; i <= ws.rowCount; i++) {
      const row = ws.getRow(i)
      rows.push({
        num: i,
        empNo: empNoIdx >= 0 ? cellText(row.getCell(empNoIdx + 1).value) : '',
        name: cellText(row.getCell(nameIdx + 1).value),
      })
    }
    const used = new Set<number>()
    const matchRow = (c: Contact) => {
      if (c.empNo && empNoIdx >= 0) {
        const byNo = rows.find((r) => !used.has(r.num) && r.empNo === c.empNo)
        if (byNo) return byNo
      }
      return rows.find((r) => !used.has(r.num) && r.name === c.name)
    }

    const write = (row: ExcelJS.Row, c: Contact) => {
      headers.forEach((h, j) => {
        if (!h) return
        const v = cellOf(c, h)
        if (v === null) return // 不由通讯录维护的列：保持原值
        row.getCell(j + 1).value = v
      })
    }

    for (const c of contacts) {
      const hit = matchRow(c)
      if (hit) {
        used.add(hit.num)
        write(ws.getRow(hit.num), c)
        updated++
      } else {
        const row = ws.addRow(headers.map((h) => cellOf(c, h) ?? '')) as ExcelJS.Row & {
          style?: unknown
        }
        // 尽量沿用上一行的样式（exceljs 类型里没声明 Row.style）
        const prev = ws.getRow(row.number - 1) as unknown as { style?: unknown }
        if (prev?.style) row.style = prev.style
        added++
      }
    }

    // 表格里多余的员工行删掉（从下往上删，行号不会串）
    for (let i = rows.length - 1; i >= 0; i--) {
      const r = rows[i]
      if (used.has(r.num)) continue
      if (!r.name && !r.empNo) continue // 空行/说明行不动
      ws.spliceRows(r.num, 1)
      removed++
    }

    await wb.xlsx.writeFile(target)
    return { ok: true, file: target, added, updated, removed }
  } catch (err: any) {
    return { ok: false, file: target, error: err?.message ?? String(err) }
  }
}

/**
 * 生成示例数据：通讯录.xlsx + 2026年10月工资表.xlsx
 * 运行：npm run gen:demo
 */
import fs from 'node:fs'
import path from 'node:path'
import ExcelJS from 'exceljs'
import { fileURLToPath } from 'node:url'

const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../示例数据')

type Person = {
  empNo: string
  name: string
  email: string
  dept: string
  base: number
  post: number
  bonus: number
  ot: number
  social: number
  fund: number
  tax: number
  leave: number
  other: number
  note: string
  sheet: string
}

const people: Person[] = [
  { empNo: 'E001', name: '张伟', email: 'zhangwei@example.com', dept: '技术部', base: 12000, post: 3000, bonus: 2000, ot: 800, social: 1200, fund: 800, tax: 640, leave: 0, other: 0, note: '', sheet: '正式' },
  { empNo: 'E002', name: '李娜', email: 'lina@example.com', dept: '财务部', base: 10000, post: 2500, bonus: 1500, ot: 0, social: 1000, fund: 700, tax: 320, leave: 0, other: 0, note: '', sheet: '正式' },
  { empNo: 'E003', name: '王强', email: 'wangqiang@example.com', dept: '技术部', base: 11000, post: 2800, bonus: 1800, ot: 1200, social: 1100, fund: 750, tax: 480, leave: 300, other: 0, note: '事假1天', sheet: '正式' },
  { empNo: 'E004', name: '刘洋', email: 'liuyang@example.com', dept: '市场部', base: 9500, post: 2200, bonus: 3000, ot: 0, social: 950, fund: 650, tax: 400, leave: 0, other: 0, note: '绩效优秀', sheet: '正式' },
  { empNo: 'E005', name: '陈静', email: 'chenjing@example.com', dept: '人事部', base: 9000, post: 2000, bonus: 1200, ot: 0, social: 900, fund: 600, tax: 210, leave: 150, other: 0, note: '迟到1次', sheet: '正式' },
  // 同名示例：两个张三，靠工号区分
  { empNo: 'E006', name: '张三', email: 'zhangsan.tech@example.com', dept: '技术部', base: 8500, post: 1800, bonus: 1000, ot: 600, social: 850, fund: 550, tax: 180, leave: 0, other: 0, note: '', sheet: '正式' },
  { empNo: 'E007', name: '张三', email: 'zhangsan.mkt@example.com', dept: '市场部', base: 8000, post: 1600, bonus: 1500, ot: 0, social: 800, fund: 500, tax: 150, leave: 0, other: 0, note: '', sheet: '正式' },
  { empNo: 'E008', name: '赵敏', email: 'zhaomin@example.com', dept: '财务部', base: 10500, post: 2600, bonus: 1600, ot: 300, social: 1050, fund: 720, tax: 380, leave: 0, other: 0, note: '', sheet: '正式' },
  { empNo: 'E009', name: '孙悦', email: 'sunyue@example.com', dept: '技术部', base: 5000, post: 800, bonus: 500, ot: 0, social: 500, fund: 300, tax: 0, leave: 0, other: 0, note: '实习', sheet: '实习' },
  { empNo: 'E010', name: '周涛', email: 'zhoutao@example.com', dept: '市场部', base: 5200, post: 800, bonus: 600, ot: 200, social: 520, fund: 310, tax: 0, leave: 100, other: 0, note: '实习·事假1天', sheet: '实习' },
]

function styleHeader(ws: ExcelJS.Worksheet) {
  const row = ws.getRow(1)
  row.font = { bold: true }
  row.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFEAF2FF' },
  }
  row.alignment = { vertical: 'middle', horizontal: 'center' }
  row.height = 22
}

async function buildContacts() {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('通讯录')
  ws.columns = [
    { header: '工号', key: 'empNo', width: 10 },
    { header: '姓名', key: 'name', width: 12 },
    { header: '邮箱', key: 'email', width: 28 },
    { header: '部门', key: 'dept', width: 12 },
    { header: '备注', key: 'note', width: 20 },
  ]
  for (const p of people) {
    ws.addRow({
      empNo: p.empNo,
      name: p.name,
      email: p.email,
      dept: p.dept,
      note: p.sheet === '实习' ? '实习生' : '',
    })
  }
  styleHeader(ws)
  ws.views = [{ state: 'frozen', ySplit: 1 }]
  const file = path.join(OUT_DIR, '通讯录.xlsx')
  await wb.xlsx.writeFile(file)
  return file
}

/** 工资表：故意不含邮箱列，完全靠通讯录匹配 */
async function buildSalary() {
  const wb = new ExcelJS.Workbook()
  const sheets = ['正式', '实习']
  const headers = [
    '工号',
    '姓名',
    '部门',
    '基本工资',
    '岗位工资',
    '绩效奖金',
    '加班费',
    '<b>应发合计</b>',
    '社保',
    '公积金',
    '个税',
    '<b>减</b>',
    '请假扣款',
    '其他扣款',
    '<b>实发总计</b>',
    '备注',
  ]

  for (const s of sheets) {
    const ws = wb.addWorksheet(`2026年10月-${s}`)
    ws.columns = headers.map((h) => ({
      header: h,
      width: h.includes('工资') || h.includes('合计') || h.includes('总计') ? 14 : 10,
    }))

    for (const p of people.filter((x) => x.sheet === s)) {
      const gross = p.base + p.post + p.bonus + p.ot
      const net = gross - p.social - p.fund - p.tax - p.leave - p.other
      ws.addRow([
        p.empNo,
        p.name,
        p.dept,
        p.base,
        p.post,
        p.bonus,
        p.ot,
        gross,
        p.social,
        p.fund,
        p.tax,
        '', // <b>减</b> 分组标题行，值为空
        p.leave,
        p.other,
        net,
        p.note,
      ])
    }

    // 金额列千分位 + 两位小数
    ws.eachRow((row, i) => {
      if (i === 1) return
      row.eachCell((cell, col) => {
        if (col >= 4 && col <= 15) cell.numFmt = '#,##0.00'
      })
    })

    styleHeader(ws)
    ws.views = [{ state: 'frozen', ySplit: 1, xSplit: 2 }]
  }

  const file = path.join(OUT_DIR, '2026年10月工资表.xlsx')
  await wb.xlsx.writeFile(file)
  return file
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const a = await buildContacts()
  const b = await buildSalary()
  console.log('已生成：')
  console.log(' -', a)
  console.log(' -', b)
  console.log(`共 ${people.length} 名员工（含 2 名同名「张三」，靠工号 E006/E007 区分）`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

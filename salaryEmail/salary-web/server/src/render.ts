import type { Employee } from '../../shared/types'

const CSS = `
body{margin:0;padding:16px;background:#f5f6f8;font-family:-apple-system,"Microsoft YaHei",Arial,sans-serif;color:#222;}
.card{max-width:560px;margin:0 auto;background:#fff;border-radius:10px;padding:24px;box-shadow:0 2px 10px rgba(0,0,0,.06);}
h2{margin:0 0 2px;font-size:18px;}
.sub{color:#888;font-size:12px;margin-bottom:18px;}
table{width:100%;border-collapse:collapse;font-size:14px;}
td{padding:9px 10px;border-bottom:1px solid #f0f0f0;}
td.k{color:#666;width:50%;}
td.v{text-align:right;font-variant-numeric:tabular-nums;white-space:pre-wrap;word-break:break-all;}
tr.bold td{font-weight:700;background:#fafbfc;}
tr.group td{padding:14px 10px 6px;color:#333;font-weight:700;border-bottom:1px solid #e6e6e6;}
.foot{margin-top:18px;color:#9a9a9a;font-size:12px;line-height:1.6;}
`

const FOOTER = '本邮件由系统自动发送，请勿回复。<br>如工资数据有疑问，请在收到邮件后 3 个工作日内联系人资部。'

function esc(s: string) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string)
}

/** 主题模板：支持 {sheet} {name} */
export function renderSubject(tpl: string, sheet: string, name: string) {
  return (tpl || '{sheet}').replace(/\{sheet\}/g, sheet).replace(/\{name\}/g, name).trim()
}

/** 列表展示用的主数值（实发优先） */
export function mainValue(e: Employee) {
  const hit = e.items.find((i) => i.key.includes('实发')) ?? [...e.items].reverse().find((i) => i.bold && i.value)
  return hit?.value ?? ''
}

export function renderHtml(e: Employee, subject: string) {
  // 主题里已经带了月份/表名（如「2026年10月 工资条」），副标题就不再重复
  const sub = e.sheet && !subject.includes(e.sheet) ? `${e.sheet} · ${e.name}` : e.name
  const rows = e.items
    .map((it) => {
      if (it.bold && !it.value) {
        return `<tr class="group"><td colspan="2">${esc(it.key)}</td></tr>`
      }
      return `<tr class="${it.bold ? 'bold' : ''}"><td class="k">${esc(it.key)}</td><td class="v">${esc(it.value || '-')}</td></tr>`
    })
    .join('\n')
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${CSS}</style></head>
<body><div class="card">
  <h2>${esc(subject)}</h2>
  <div class="sub">${esc(sub)}</div>
  <table>\n${rows}\n</table>
  <div class="foot">${FOOTER}</div>
</div></body></html>`
}

export function renderText(e: Employee, subject: string) {
  const lines = e.items.map((it) =>
    it.bold && !it.value ? `【${it.key}】` : `${it.key}: ${it.value || '-'}`,
  )
  return [subject, '', ...lines, '', '本邮件由系统自动发送，请勿回复。'].join('\n')
}

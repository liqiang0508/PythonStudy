/**
 * 表头 → 字段的识别关键词：**全项目唯一来源**（后端解析、前端显示共用）。
 * 关键词别写太宽泛（例如只用「员工」会把「员工编号」误认成姓名列）。
 */
export const HEADER_RULES = [
  { field: 'name', names: ['姓名', '名字', '员工姓名', '人员姓名'] },
  { field: 'email', names: ['邮箱', '邮件', '邮箱地址', '邮件地址', 'e-mail', 'email'] },
  { field: 'empNo', names: ['工号', '员工号', '员工编号', '编号'] },
  { field: 'department', names: ['部门', '部门名称', '所属部门', '所在部门'] },
  { field: 'note', names: ['备注', '说明', '备注说明', 'note'] },
  { field: 'active', names: ['在职', '是否在职', '在职状态', '状态'] },
]

export type HeaderField = (typeof HEADER_RULES)[number]['field']

/**
 * 判断某个表头属于哪个字段；认不出来返回 undefined（说明这是表格里的自定义列）。
 * 匹配顺序与后端 `assignHeaderColumns` 一致：先精确、再包含。
 * @param fields 只在这些字段里找（不传 = 全部）
 */
export function headerField(header: string, fields?: HeaderField[]): HeaderField | undefined {
  const h = (header ?? '').trim().toLowerCase()
  if (!h) return undefined
  const rules = fields?.length ? HEADER_RULES.filter((r) => fields.includes(r.field)) : HEADER_RULES

  const exact = rules.find((r) => r.names.some((n) => n.toLowerCase() === h))
  if (exact) return exact.field

  const like = rules.find((r) =>
    r.names.some((n) => {
      const k = n.toLowerCase()
      return k.length >= 2 && (h.includes(k) || k.includes(h))
    }),
  )
  return like?.field
}

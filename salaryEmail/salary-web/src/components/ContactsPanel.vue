<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { api } from '../api'
import type { Contact } from '../../shared/types'
import { headerField } from '../../shared/columns'

const emit = defineEmits<{ (e: 'error', v: string): void; (e: 'changed'): void }>()

const contacts = ref<Contact[]>([])
const keyword = ref('')
const loading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const message = ref('')

/** 通讯录表格里的表头顺序，展示时沿用，和 Excel 里看到的列顺序一致 */
const fileColumns = ref<string[]>([])
/** 最近一次导入的通讯录是哪个表格 */
const source = ref<string | null>(null)
const importedAt = ref<string | null>(null)

/** 重新导入时，表格里已经删掉的人怎么处理；记住上次选择 */
const IMPORT_MODES = [
  { value: 'sync-delete', label: '以表格为准：表格里没有的 → 删除（默认）' },
  { value: 'sync-disable', label: '以表格为准：表格里没有的 → 停用' },
  { value: 'merge', label: '增量更新：表格里没有的保留不动' },
] as const
const MODE_KEY = 'salary.contactImportMode.v2'
const importMode = ref<string>(
  IMPORT_MODES.some((m) => m.value === localStorage.getItem(MODE_KEY))
    ? String(localStorage.getItem(MODE_KEY))
    : 'sync-delete',
)

async function load() {
  const r = await api.contacts()
  contacts.value = r.contacts
  if (r.columns?.length) fileColumns.value = r.columns
  source.value = r.source ?? null
  importedAt.value = r.importedAt ?? null
}

onMounted(load)

async function onFile(e: Event) {
  const el = e.target as HTMLInputElement
  const f = el.files?.[0]
  el.value = ''
  if (!f) return
  loading.value = true
  try {
    const r = await api.importContacts(f, importMode.value)
    localStorage.setItem(MODE_KEY, importMode.value)
    contacts.value = r.contacts
    if (r.columns?.length) fileColumns.value = r.columns
    source.value = r.source ?? null
    importedAt.value = r.importedAt ?? null
    message.value = `导入完成：新增 ${r.added} 人，更新 ${r.updated} 人，跳过 ${r.skipped} 行`
    if (r.disabled) message.value += `，停用 ${r.disabled} 人（表格里已不存在）`
    if (r.removed) message.value += `，删除 ${r.removed} 人（表格里已不存在）`
    if (r.warnings.length) message.value += `（${r.warnings.join('；')}）`
    emit('changed')
  } catch (err: any) {
    emit('error', err.message)
  } finally {
    loading.value = false
  }
}

/** 「在职 / 状态」是系统内部字段（active），不显示 */
function isStatusCol(col: string) {
  return headerField(col) === 'active'
}

/** 取某一列的值：先按共享的表头规则映射到字段，认不出来就去 extra（自定义列）里找 */
function cell(c: Contact, col: string): string {
  switch (headerField(col)) {
    case 'name':
      return c.name
    case 'email':
      return c.email
    case 'empNo':
      return c.empNo
    case 'department':
      return c.department
    case 'note':
      return c.note
    case 'active':
      return '' // 内部状态，界面不展示
    default:
      return c.extra?.[col] ?? ''
  }
}

/** 展示的列：表格里的列（按原顺序）+ 自定义列 */
const viewColumns = computed(() => {
  // 列完全来自表格：导入时后端把表头顺序记在 contactColumns 里，这里直接用它
  const cols = [...fileColumns.value].filter((c) => !isStatusCol(c))
  // 备注：表里有这列就按表格顺序显示，否则只在有人填了备注时才补
  if (!cols.some((c) => headerField(c) === 'note') && contacts.value.some((c) => c.note))
    cols.push('备注')
  const extras = new Set<string>()
  contacts.value.forEach((c) => Object.keys(c.extra ?? {}).forEach((k) => extras.add(k)))
  extras.forEach((k) => {
    if (!cols.includes(k)) cols.push(k)
  })
  return cols
})

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return contacts.value.filter((c) => {
    if (!kw) return true
    return `${c.name} ${c.email} ${c.empNo} ${c.department}`.toLowerCase().includes(kw)
  })
})
</script>

<template>
  <div class="card">
    <h3>
      员工通讯录
      <span class="mini muted" style="font-weight: 400">
        · 当前通讯录：<b>{{ source || '未导入' }}</b>
        <span v-if="importedAt">
          （{{ new Date(importedAt).toLocaleString('zh-CN') }} 导入）
        </span>
      </span>
    </h3>

    <div class="toolbar">
      <input v-model="keyword" type="text" placeholder="搜索姓名 / 邮箱 / 工号 / 部门" style="width: 220px" />
      <button class="btn primary sm" :disabled="loading" @click="fileInput?.click()">
        {{ loading ? '导入中…' : '导入通讯录表格' }}
      </button>
      <input
        ref="fileInput"
        type="file"
        accept=".xlsx,.xlsm,.csv"
        hidden
        @change="onFile"
      />
      <span class="spacer" />
      <span class="mini muted">共 {{ contacts.length }} 人</span>
    </div>

    <div class="toolbar">
      <span class="mini muted">重新导入时，表格里已删掉的人</span>
      <select v-model="importMode" style="width: auto; min-width: 260px">
        <option v-for="m in IMPORT_MODES" :key="m.value" :value="m.value">{{ m.label }}</option>
      </select>
    </div>

    <p v-if="message" class="mini" style="color: var(--success)">{{ message }}</p>
    <p class="mini muted">
      通讯录以你的表格为准：<b>有人员变动就在 Excel 里改好，回来重新导入</b>即可（按工号 / 姓名覆盖，不会产生重复）。
      工资表不用写邮箱列，导入时按<b>姓名</b>在这里找邮箱；<b>同名员工请填不同的工号</b>，系统会用工资表里的工号列区分。
      上面「重新导入时」可选择表格里已删掉的人是<b>停用</b>还是<b>直接删除</b>（选择会被记住）；停用的人不参与工资表匹配。
    </p>

    <div v-if="!contacts.length" class="empty">还没有通讯录，点「导入通讯录表格」</div>
    <div v-else-if="!viewColumns.length" class="empty">这份表格里没有可显示的列</div>
    <div v-else-if="!filtered.length" class="empty">没有符合搜索条件的人</div>
    <div v-else class="table-wrap">
      <table class="grid">
        <thead>
          <tr>
            <th v-for="col in viewColumns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filtered" :key="c.id">
            <td v-for="col in viewColumns" :key="col" :class="cell(c, col) ? '' : 'muted'">
              {{ cell(c, col) || '—' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

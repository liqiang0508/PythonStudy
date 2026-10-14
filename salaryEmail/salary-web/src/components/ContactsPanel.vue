<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { api, exportContactsUrl } from '../api'
import type { Contact, ContactInput, SyncState } from '../../shared/types'

const emit = defineEmits<{ (e: 'error', v: string): void; (e: 'changed'): void }>()

const contacts = ref<Contact[]>([])
const keyword = ref('')
const loading = ref(false)
const editing = ref<Contact | null>(null)
const showForm = ref(false)
const form = ref<ContactInput>(blank())
const fileInput = ref<HTMLInputElement | null>(null)
const message = ref('')

function blank(): ContactInput {
  return { name: '', email: '', empNo: '', department: '', active: true, note: '' }
}

/** 通讯录表格里的表头顺序，展示与导出都沿用，和 Excel 里看到的列顺序一致 */
const fileColumns = ref<string[]>([])

/** 同步的本地 Excel 路径 + 输入框 + 同步结果提示 */
const filePath = ref('')
const pathInput = ref('')
const syncMsg = ref('')
const syncOk = ref(true)

function showSync(s?: SyncState) {
  if (!s) return
  syncOk.value = s.ok
  syncMsg.value = s.ok
    ? `已写回表格：${s.file}（更新 ${s.updated ?? 0} 行，新增 ${s.added ?? 0} 行，删除 ${s.removed ?? 0} 行）`
    : `数据已保存，但写回表格失败：${s.error}（表格若正开着，请先关闭再点「立即同步」）`
  filePath.value = s.file || filePath.value
}

async function bindFile() {
  loading.value = true
  try {
    const r = await api.setContactsFile(pathInput.value)
    filePath.value = r.file
    pathInput.value = ''
    showSync(r.sync)
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    loading.value = false
  }
}

async function syncNow() {
  loading.value = true
  try {
    const r = await api.syncContacts()
    filePath.value = r.file
    showSync(r.sync)
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    loading.value = false
  }
}

async function reveal() {
  try {
    await api.revealContactsFile()
  } catch (e: any) {
    emit('error', e.message)
  }
}

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
const onlyActive = ref(false)

async function load() {
  const r = await api.contacts()
  contacts.value = r.contacts
  if (r.columns?.length) fileColumns.value = r.columns
  if (r.file) filePath.value = r.file
}

onMounted(load)

const COL_MAP: Array<{ re: RegExp; get: (c: Contact) => string }> = [
  { re: /工号|员工号|编号/, get: (c) => c.empNo },
  { re: /姓名|名字/, get: (c) => c.name },
  { re: /邮箱|邮件|e-?mail/i, get: (c) => c.email },
  { re: /部门/, get: (c) => c.department },
  { re: /备注|说明|note/i, get: (c) => c.note },
]

function isStatusCol(col: string) {
  return /在职|状态/.test(col)
}

function cell(c: Contact, col: string): string {
  if (isStatusCol(col)) return ''
  const f = COL_MAP.find((x) => x.re.test(col))
  if (f) return f.get(c)
  return c.extra?.[col] ?? ''
}

/** 展示的列：表格里的列（按原顺序）+ 在职/备注 + 自定义列 */
const viewColumns = computed(() => {
  const cols = fileColumns.value.length
    ? [...fileColumns.value]
    : ['工号', '姓名', '邮箱', '部门']
  if (!cols.some(isStatusCol)) cols.push('在职')
  if (!cols.some((c) => /备注|说明/.test(c))) cols.push('备注')
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
    if (onlyActive.value && !c.active) return false
    if (!kw) return true
    return `${c.name} ${c.email} ${c.empNo} ${c.department}`.toLowerCase().includes(kw)
  })
})

const activeCount = computed(() => contacts.value.filter((c) => c.active).length)

function openNew() {
  editing.value = null
  form.value = blank()
  showForm.value = true
}

function openEdit(c: Contact) {
  editing.value = c
  showForm.value = true
  form.value = {
    name: c.name,
    email: c.email,
    empNo: c.empNo,
    department: c.department,
    active: c.active,
    note: c.note,
  }
}

async function save() {
  loading.value = true
  try {
    const r = editing.value
      ? await api.updateContact(editing.value.id, form.value)
      : await api.addContact(form.value)
    showSync(r.sync)
    await load()
    showForm.value = false
    editing.value = null
    emit('changed')
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    loading.value = false
  }
}

async function remove(c: Contact) {
  if (!confirm(`确认删除员工「${c.name}」？删除后工资表将无法自动匹配到他的邮箱。`)) return
  const r = await api.removeContact(c.id)
  showSync(r.sync)
  await load()
  emit('changed')
}

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
    message.value = `导入完成：新增 ${r.added} 人，更新 ${r.updated} 人，跳过 ${r.skipped} 行`
    if (r.disabled) message.value += `，停用 ${r.disabled} 人（表格里已不存在）`
    if (r.removed) message.value += `，删除 ${r.removed} 人（表格里已不存在）`
    if (r.warnings.length) message.value += `（${r.warnings.join('；')}）`
    showSync(r.sync)
    emit('changed')
  } catch (err: any) {
    emit('error', err.message)
  } finally {
    loading.value = false
  }
}

function exportContacts() {
  window.location.href = exportContactsUrl
}
</script>

<template>
  <div class="card">
    <h3>员工通讯录</h3>
    <div class="toolbar">
      <input v-model="keyword" type="text" placeholder="搜索姓名 / 邮箱 / 工号 / 部门" style="width: 220px" />
      <button class="btn primary sm" @click="openNew">新增员工</button>
      <button class="btn sm" @click="fileInput?.click()">从表格导入通讯录</button>
      <input
        ref="fileInput"
        type="file"
        accept=".xlsx,.xlsm,.csv"
        hidden
        @change="onFile"
      />
      <button class="btn sm" :disabled="!contacts.length" @click="exportContacts">
        导出通讯录
      </button>
      <span class="spacer" />
      <span class="mini muted">共 {{ contacts.length }} 人，在职 {{ activeCount }} 人</span>
    </div>

    <div class="toolbar">
      <span class="mini muted">重新导入时，表格里已删掉的人</span>
      <select v-model="importMode" style="width: auto; min-width: 260px">
        <option v-for="m in IMPORT_MODES" :key="m.value" :value="m.value">{{ m.label }}</option>
      </select>
      <label class="check"><input v-model="onlyActive" type="checkbox" /> 只看在职</label>
    </div>

    <div class="toolbar">
      <span class="mini muted">同步的表格</span>
      <input
        v-model="pathInput"
        type="text"
        :placeholder="filePath || '留空用默认位置'"
        style="width: 360px"
      />
      <button class="btn sm" @click="bindFile">绑定并同步</button>
      <button class="btn sm" @click="syncNow">立即同步</button>
      <button class="btn sm" @click="reveal">打开文件位置</button>
    </div>
    <p class="mini muted">
      当前同步到：<b>{{ filePath || '未设置' }}</b>
      —— 粘贴本机 Excel 的完整路径（如 <code>D:\人事\通讯录.xlsx</code>）可改成你自己的文件，留空则保存在
      <code>server/data/通讯录.xlsx</code>。界面上新增 / 编辑 / 删除员工都会自动写回这个文件。
    </p>
    <p v-if="syncMsg" class="mini" :style="{ color: syncOk ? 'var(--success)' : 'var(--danger)' }">
      {{ syncMsg }}
    </p>

    <p v-if="message" class="mini" style="color: var(--success)">{{ message }}</p>
    <p class="mini muted">
      工资表不用写邮箱列：导入时按<b>姓名</b>在这里找邮箱；<b>同名员工请填不同的工号</b>，系统会用工资表里的工号列区分。
      列表列顺序与你的通讯录表格保持一致；<b>导出 → 在 Excel 里改 → 重新导入</b>即可更新（按工号/姓名覆盖，不会重复）。
      上面「重新导入时」可选择表格里已删掉的人是<b>停用</b>还是<b>直接删除</b>（选择会被记住）；停用的人不参与工资表匹配。
    </p>

    <div v-if="!contacts.length" class="empty">还没有员工，点「新增员工」或「从表格导入通讯录」</div>
    <div v-else class="table-wrap">
      <table class="grid">
        <thead>
          <tr>
            <th v-for="col in viewColumns" :key="col">{{ col }}</th>
            <th style="width: 120px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filtered" :key="c.id">
            <td v-for="col in viewColumns" :key="col">
              <span v-if="isStatusCol(col)">
                <span v-if="c.active" class="badge success">在职</span>
                <span v-else class="badge pending">停用</span>
              </span>
              <span v-else :class="cell(c, col) ? '' : 'muted'">
                {{ cell(c, col) || '—' }}
              </span>
            </td>
            <td>
              <div class="row-actions">
                <button class="btn sm" @click="openEdit(c)">编辑</button>
                <button class="btn sm danger" @click="remove(c)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-if="showForm" class="modal-mask" @click.self="showForm = false">
    <div class="modal" style="max-width: 460px">
      <header>{{ editing ? '编辑员工' : '新增员工' }}</header>
      <div class="body">
        <div class="grid-2">
          <div class="field">
            <span>姓名 *</span>
            <input v-model="form.name" type="text" placeholder="张三" />
          </div>
          <div class="field">
            <span>邮箱 *</span>
            <input v-model="form.email" type="text" placeholder="zhangsan@company.com" />
          </div>
          <div class="field">
            <span>工号（用于精确匹配）</span>
            <input v-model="form.empNo" type="text" placeholder="E001" />
          </div>
          <div class="field">
            <span>部门</span>
            <input v-model="form.department" type="text" placeholder="技术部" />
          </div>
        </div>
        <div style="margin-top: 12px; display: flex; gap: 12px; align-items: center">
          <label class="check"><input v-model="form.active" type="checkbox" /> 在职（取消后不参与匹配）</label>
        </div>
        <div class="field" style="margin-top: 12px">
          <span>备注</span>
          <input v-model="form.note" type="text" />
        </div>
      </div>
      <footer>
        <button class="btn" @click="showForm = false">取消</button>
        <button class="btn primary" :disabled="loading || !form.name || !form.email" @click="save">
          保存
        </button>
      </footer>
    </div>
  </div>
</template>

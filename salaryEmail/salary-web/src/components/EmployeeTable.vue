<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EmployeeSummary } from '../../shared/types'

const props = defineProps<{ employees: EmployeeSummary[]; selected: string[] }>()
const emit = defineEmits<{
  (e: 'update:selected', v: string[]): void
  (e: 'preview', id: string): void
  (e: 'send-one', id: string): void
  (e: 'send-selected', ids: string[]): void
  (e: 'bind', id: string): void
  (e: 'resolve'): void
}>()

const keyword = ref('')
const status = ref<'all' | 'pending' | 'success' | 'failed' | 'invalid'>('all')
const sheet = ref('all')

const sheets = computed(() => [...new Set(props.employees.map((e) => e.sheet))])

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return props.employees.filter((e) => {
    if (kw && !`${e.name} ${e.email}`.toLowerCase().includes(kw)) return false
    if (sheet.value !== 'all' && e.sheet !== sheet.value) return false
    if (status.value === 'invalid') return !e.valid
    if (status.value === 'pending') return e.lastStatus === null
    if (status.value === 'success') return e.lastStatus === 'success'
    if (status.value === 'failed') return e.lastStatus === 'failed'
    return true
  })
})

const visibleIds = computed(() => filtered.value.map((e) => e.id))
const allChecked = computed(
  () => visibleIds.value.length > 0 && visibleIds.value.every((id) => props.selected.includes(id)),
)
const selectedSet = computed(() => new Set(props.selected))
const unmatched = computed(() => props.employees.filter((e) => !e.valid).length)

function setSelected(ids: string[]) {
  emit('update:selected', ids)
}

function toggle(id: string) {
  setSelected(
    props.selected.includes(id) ? props.selected.filter((x) => x !== id) : [...props.selected, id],
  )
}

function toggleAll() {
  if (allChecked.value) setSelected(props.selected.filter((id) => !visibleIds.value.includes(id)))
  else setSelected([...new Set([...props.selected, ...visibleIds.value])])
}

function pickBy(pred: (e: EmployeeSummary) => boolean) {
  setSelected([...new Set([...props.selected, ...props.employees.filter(pred).map((e) => e.id)])])
}

const sourceText: Record<string, string> = {
  contact: '通讯录',
  sheet: '表格',
  manual: '手动',
  none: '未匹配',
}
const selectedCount = computed(() => props.selected.length)
</script>

<template>
  <div class="card">
    <h3>2. 核对并发送（共 {{ props.employees.length }} 人）</h3>

    <div class="toolbar">
      <input v-model="keyword" type="text" placeholder="搜索姓名 / 邮箱" style="width: 180px" />
      <select v-model="sheet">
        <option value="all">全部工作表</option>
        <option v-for="s in sheets" :key="s" :value="s">{{ s }}</option>
      </select>
      <select v-model="status">
        <option value="all">全部状态</option>
        <option value="pending">未发送</option>
        <option value="success">已成功</option>
        <option value="failed">发送失败</option>
        <option value="invalid">邮箱待处理</option>
      </select>
      <button class="btn sm" @click="pickBy((e) => e.lastStatus === 'failed')">选中失败</button>
      <button class="btn sm" @click="pickBy((e) => e.lastStatus !== 'success')">选中未成功</button>
      <button class="btn sm" @click="setSelected([])">清空选择</button>
      <button class="btn sm" @click="emit('resolve')">用通讯录重新匹配</button>
      <span class="spacer" />
      <span class="mini muted">已选 {{ selectedCount }} 人</span>
      <button class="btn primary" :disabled="!selectedCount" @click="emit('send-selected', props.selected)">
        发送所选
      </button>
    </div>

    <div v-if="unmatched" class="alerts">
      有 <b>{{ unmatched }}</b> 人还没有可用邮箱，请点该行「补邮箱」手动指定，或到「员工管理」新增后点上方「用通讯录重新匹配」。
    </div>

    <div v-if="!props.employees.length" class="empty">还没有数据，请先在上方导入工资表</div>

    <div v-else class="table-wrap">
      <table class="grid">
        <thead>
          <tr>
            <th style="width: 36px"><input type="checkbox" :checked="allChecked" @change="toggleAll" /></th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>来源</th>
            <th>工作表</th>
            <th style="text-align: right">实发</th>
            <th>状态</th>
            <th style="width: 170px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in filtered" :key="e.id">
            <td><input type="checkbox" :checked="selectedSet.has(e.id)" @change="toggle(e.id)" /></td>
            <td>{{ e.name || '(无姓名)' }}</td>
            <td>
              {{ e.email || '—' }}
              <span v-if="!e.valid" class="mini" style="color: var(--danger)">待补</span>
            </td>
            <td>
              <span class="badge" :class="e.emailSource === 'none' ? 'warn' : 'pending'">
                {{ sourceText[e.emailSource] || '—' }}
              </span>
            </td>
            <td>{{ e.sheet }}</td>
            <td class="num">{{ e.total || '—' }}</td>
            <td>
              <span v-if="!e.valid" class="badge warn">待处理</span>
              <span v-else-if="e.lastStatus === 'success'" class="badge success">已发送</span>
              <span v-else-if="e.lastStatus === 'failed'" class="badge failed" :title="e.lastError">失败</span>
              <span v-else class="badge pending">未发送</span>
            </td>
            <td>
              <div class="row-actions">
                <button class="btn sm" @click="emit('preview', e.id)">预览</button>
                <button class="btn sm" :disabled="!e.valid" @click="emit('send-one', e.id)">发送</button>
                <button class="btn sm" @click="emit('bind', e.id)">补邮箱</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

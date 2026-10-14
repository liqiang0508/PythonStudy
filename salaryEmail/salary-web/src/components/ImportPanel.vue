<script setup lang="ts">
import { ref } from 'vue'
import { api, templateUrl } from '../api'
import type { ImportResult } from '../../shared/types'

const props = defineProps<{ source: string | null }>()
const emit = defineEmits<{
  (e: 'imported', v: ImportResult): void
  (e: 'cleared'): void
  (e: 'error', v: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const over = ref(false)
const loading = ref(false)
const headers = ref<string[]>([])
const nameColumn = ref('姓名')
const emailColumn = ref('')
const empNoColumn = ref('')
const warnings = ref<string[]>([])
/** 识别结果（前端展示用） */
const detected = ref<{ name: string; email: string; empNo: string }>({
  name: '',
  email: '',
  empNo: '',
})
const manual = ref(false)

function apply(res: ImportResult) {
  headers.value = res.headers
  detected.value = {
    name: res.nameColumn,
    email: res.emailColumn,
    empNo: res.empNoColumn,
  }
  // 手动模式下回显「实际用到的列」
  if (!nameColumn.value) nameColumn.value = res.nameColumn || res.headers[0] || '姓名'
  if (!empNoColumn.value) empNoColumn.value = res.empNoColumn || ''
  emailColumn.value = res.emailColumn && res.headers.includes(res.emailColumn) ? res.emailColumn : ''
  warnings.value = res.warnings
  emit('imported', res)
}

async function upload(file: File) {
  loading.value = true
  try {
    apply(await api.importFile(file))
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    loading.value = false
  }
}

function onDrop(e: DragEvent) {
  over.value = false
  const f = e.dataTransfer?.files?.[0]
  if (f) upload(f)
}

function onPick(e: Event) {
  const el = e.target as HTMLInputElement
  const f = el.files?.[0]
  if (f) upload(f)
  el.value = ''
}

async function reparse() {
  loading.value = true
  try {
    apply(
      await api.reparse({
        nameColumn: nameColumn.value,
        emailColumn: emailColumn.value,
        empNoColumn: empNoColumn.value,
      }),
    )
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    loading.value = false
  }
}

async function clearData() {
  if (!confirm('确认清空已导入的工资数据？发送日志会保留。')) return
  await api.clear()
  headers.value = []
  warnings.value = []
  emit('cleared')
}
</script>

<template>
  <div class="card">
    <h3>1. 导入工资表</h3>
    <div
      class="drop"
      :class="{ over }"
      @dragover.prevent="over = true"
      @dragleave.prevent="over = false"
      @drop.prevent="onDrop"
      @click="fileInput?.click()"
    >
      <div class="big">{{ loading ? '解析中…' : '点击选择或拖拽工资表到此处' }}</div>
      <div class="mini">支持 .xlsx / .xlsm / .csv（大小 ≤ 10MB）</div>
      <input ref="fileInput" type="file" accept=".xlsx,.xlsm,.csv" hidden @change="onPick" />
    </div>

    <div class="toolbar" style="margin-top: 12px">
      <a :href="templateUrl"><button class="btn sm">下载导入模板</button></a>
      <button v-if="props.source" class="btn sm danger" @click="clearData">清空已导入数据</button>
      <span class="spacer" />
      <span class="mini muted">当前文件：{{ props.source || '无' }}</span>
    </div>

    <div v-if="headers.length" style="margin-top: 12px">
      <div class="mini muted">
        已自动识别：姓名列「<b>{{ detected.name || '—' }}</b>」· 工号列「<b>{{
          detected.empNo || '—'
        }}</b>」· 邮箱列「<b>{{ detected.email || '无 → 全部按通讯录匹配' }}</b>」
        <button class="btn sm" style="margin-left: 8px" @click="manual = !manual">
          {{ manual ? '收起' : '手动指定列' }}
        </button>
      </div>

      <div v-if="manual" class="grid-2" style="margin-top: 10px">
        <div class="field">
          <span>姓名所在列</span>
          <select v-model="nameColumn">
            <option v-for="h in headers" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>
        <div class="field">
          <span>工号所在列（同名时区分）</span>
          <select v-model="empNoColumn">
            <option value="">（无）</option>
            <option v-for="h in headers" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>
        <div class="field">
          <span>邮箱所在列</span>
          <select v-model="emailColumn">
            <option value="">（不使用，全部用通讯录匹配）</option>
            <option v-for="h in headers" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>
        <div style="align-self: end">
          <button class="btn sm" :disabled="loading" @click="reparse">按所选列重新解析</button>
        </div>
      </div>
    </div>

    <div v-if="warnings.length" class="alerts">
      <b>导入提醒</b>
      <ul>
        <li v-for="w in warnings" :key="w">{{ w }}</li>
      </ul>
    </div>
  </div>
</template>

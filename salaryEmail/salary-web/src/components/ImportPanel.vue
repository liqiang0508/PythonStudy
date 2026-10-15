<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../api'
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
const warnings = ref<string[]>([])
/** 识别结果（前端展示用） */
const detected = ref<{ name: string; email: string; empNo: string }>({
  name: '',
  email: '',
  empNo: '',
})

/** 这一列被识别成了什么，用于在列清单里标出来 */
function roleOf(h: string) {
  if (h === detected.value.name) return '姓名列'
  if (h === detected.value.empNo) return '工号列'
  if (h === detected.value.email) return '邮箱列'
  return ''
}

function apply(res: ImportResult) {
  headers.value = res.headers
  detected.value = {
    name: res.nameColumn,
    email: res.emailColumn,
    empNo: res.empNoColumn,
  }
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
      <button v-if="props.source" class="btn sm danger" @click="clearData">清空已导入数据</button>
      <span class="spacer" />
      <span class="mini muted">当前文件：{{ props.source || '无' }}</span>
    </div>

    <div v-if="headers.length" style="margin-top: 12px">
      <div class="mini muted" style="margin-bottom: 6px">
        表格里的列（{{ headers.length }}）：
        <span v-for="(h, i) in headers" :key="h"
          ><span :style="roleOf(h) ? { color: 'var(--success)', fontWeight: 600 } : undefined">{{
            h
          }}</span
          ><span v-if="roleOf(h)" class="mini muted">「{{ roleOf(h) }}」</span
          ><span v-if="i < headers.length - 1"> · </span></span
        >
      </div>

      <div class="mini muted">
        用于匹配：姓名列「<b>{{ detected.name || '—' }}</b>」· 工号列「<b>{{
          detected.empNo || '—'
        }}</b>」· 邮箱列「<b>{{ detected.email || '无 → 全部按通讯录匹配' }}</b>」
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

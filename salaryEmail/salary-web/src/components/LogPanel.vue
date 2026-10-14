<script setup lang="ts">
import { computed, ref } from 'vue'
import { exportLogUrl } from '../api'
import type { LogEntry } from '../../shared/types'

const props = defineProps<{ logs: LogEntry[] }>()
const emit = defineEmits<{ (e: 'refresh'): void; (e: 'error', v: string): void }>()

const keyword = ref('')
const status = ref<'all' | 'success' | 'failed'>('all')

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return props.logs.filter((l) => {
    if (status.value !== 'all' && l.status !== status.value) return false
    if (kw && !`${l.name} ${l.email}`.toLowerCase().includes(kw)) return false
    return true
  })
})

const okCount = computed(() => props.logs.filter((l) => l.status === 'success').length)
const failCount = computed(() => props.logs.filter((l) => l.status === 'failed').length)
</script>

<template>
  <div class="card">
    <h3>发送日志</h3>
    <div class="toolbar">
      <input v-model="keyword" type="text" placeholder="搜索姓名 / 邮箱" style="width: 180px" />
      <select v-model="status">
        <option value="all">全部结果</option>
        <option value="success">仅成功</option>
        <option value="failed">仅失败</option>
      </select>
      <button class="btn sm" @click="emit('refresh')">刷新</button>
      <a :href="exportLogUrl"><button class="btn sm">导出 CSV</button></a>
      <span class="spacer" />
      <span class="mini muted">
        共 {{ props.logs.length }} 条 · 成功 {{ okCount }} · 失败 {{ failCount }}
      </span>
    </div>

    <div v-if="!props.logs.length" class="empty">暂无发送记录</div>
    <div v-else class="table-wrap">
      <table class="grid">
        <thead>
          <tr>
            <th style="width: 150px">时间</th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>工作表</th>
            <th style="width: 80px">结果</th>
            <th>失败原因</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in filtered" :key="l.id">
            <td>{{ new Date(l.time).toLocaleString('zh-CN') }}</td>
            <td>{{ l.name }}</td>
            <td>{{ l.email }}</td>
            <td>{{ l.sheet }}</td>
            <td>
              <span v-if="l.status === 'success'" class="badge success">成功</span>
              <span v-else class="badge failed">失败</span>
            </td>
            <td class="muted" style="white-space: normal">{{ l.error || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

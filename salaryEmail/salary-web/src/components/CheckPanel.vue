<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { api } from '../api'
import type { CheckReport } from '../../shared/types'

const props = defineProps<{ version: number }>()
const emit = defineEmits<{ (e: 'error', v: string): void }>()

const report = ref<CheckReport | null>(null)
const loading = ref(false)

async function load() {
  loading.value = true
  try {
    report.value = await api.check()
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    loading.value = false
  }
}

onMounted(load)
// 导入/发送/清空后由父组件递增 version 触发重新体检
watch(
  () => props.version,
  () => load(),
)

const errors = computed(() => report.value?.issues.filter((i) => i.level === 'error') ?? [])
const warns = computed(() => report.value?.issues.filter((i) => i.level === 'warn') ?? [])
</script>

<template>
  <div class="card">
    <header class="card-head">
      <h3>发送前体检</h3>
      <button class="btn sm" :disabled="loading" @click="load">
        {{ loading ? '检查中…' : '重新检查' }}
      </button>
    </header>

    <template v-if="report">
      <div class="check-stats">
        <span class="badge" :class="report.ok ? 'success' : 'failed'">
          {{ report.ok ? '可以发送' : '存在必须处理的问题' }}
        </span>
        <span class="mini muted">共 {{ report.stats.total }} 人</span>
        <span class="mini muted">
          实发合计 {{ report.stats.amount.toLocaleString('zh-CN') }}
        </span>
        <span v-if="report.stats.month" class="mini muted">月份 {{ report.stats.month }}</span>
        <span v-if="report.compare" class="mini muted">
          上期（{{ report.compare.prevMonth }}）{{ report.compare.prevCount }} 人
        </span>
      </div>

      <div v-if="errors.length" class="alerts" style="border-color: #fecaca; background: #fef2f2; color: #b91c1c">
        <b>必须处理（{{ errors.length }}）</b>
        <ul>
          <li v-for="(i, k) in errors" :key="k">{{ i.text }}</li>
        </ul>
      </div>

      <div v-if="warns.length" class="alerts">
        <b>请留意（{{ warns.length }}）</b>
        <ul>
          <li v-for="(i, k) in warns" :key="k">{{ i.text }}</li>
        </ul>
      </div>

      <p v-if="!report.issues.length" class="mini muted" style="margin: 10px 0 0">
        没发现问题，可以直接发送。
      </p>
    </template>
  </div>
</template>

<style scoped>
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.card-head h3 {
  margin: 0;
}
.check-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}
</style>

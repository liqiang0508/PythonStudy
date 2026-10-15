<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { api } from '../api'
import type { ScheduleState } from '../../shared/types'

const emit = defineEmits<{
  (e: 'error', v: string): void
  (e: 'done'): void
}>()

const st = ref<ScheduleState | null>(null)
const saving = ref(false)
const running = ref(false)
const timer = ref<number | null>(null)

const form = ref({ enabled: false, day: '10', hour: 9, minute: 0, skipSent: true, onError: 'abort' })

function apply(s: ScheduleState) {
  form.value = {
    enabled: s.enabled,
    day: String(s.day),
    hour: s.hour,
    minute: s.minute,
    skipSent: s.skipSent,
    onError: s.onError,
  }
}

async function load() {
  try {
    st.value = await api.schedule()
    apply(st.value)
  } catch (e: any) {
    emit('error', e.message)
  }
}

onMounted(load)

function stopTimer() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}
onUnmounted(stopTimer)

async function save() {
  saving.value = true
  try {
    const day = form.value.day === 'last' ? 'last' : Number(form.value.day)
    st.value = await api.saveSchedule({
      enabled: form.value.enabled,
      day,
      hour: Number(form.value.hour),
      minute: Number(form.value.minute),
      skipSent: form.value.skipSent,
      onError: form.value.onError as 'abort' | 'send',
    })
    apply(st.value)
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    saving.value = false
  }
}

/** 立即按当前配置跑一次（等价于定时任务到点） */
async function runNow() {
  running.value = true
  try {
    const r = await api.runSchedule()
    st.value = r
    emit('done')
    timer.value = window.setInterval(async () => {
      st.value = await api.schedule()
      if (!st.value.running) stopTimer()
    }, 1500)
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    running.value = false
  }
}

const nextText = computed(() =>
  st.value?.nextRun ? new Date(st.value.nextRun).toLocaleString('zh-CN') : '—',
)
const lastText = computed(() =>
  st.value?.lastRun ? new Date(st.value.lastRun).toLocaleString('zh-CN') : '从未执行',
)
</script>

<template>
  <div class="card">
    <header class="card-head">
      <h3>定时发送</h3>
      <span v-if="st?.enabled" class="badge success">已启用</span>
      <span v-else class="badge pending">未启用</span>
    </header>

    <div class="toolbar">
      <label class="check">
        <input v-model="form.enabled" type="checkbox" />
        启用定时发送
      </label>
      <span class="mini muted">每月</span>
      <select v-model="form.day" style="width: 120px">
        <option v-for="d in 31" :key="d" :value="String(d)">{{ d }} 号</option>
        <option value="last">最后一天</option>
      </select>
      <input v-model.number="form.hour" type="number" min="0" max="23" style="width: 68px" />
      <span class="mini muted">时</span>
      <input v-model.number="form.minute" type="number" min="0" max="59" style="width: 68px" />
      <span class="mini muted">分</span>
      <button class="btn sm primary" :disabled="saving" @click="save">保存</button>
      <span class="spacer" />
      <button class="btn sm" :disabled="running || st?.running" @click="runNow">
        {{ st?.running ? '发送中…' : '立即执行一次' }}
      </button>
    </div>

    <div class="toolbar">
      <label class="check">
        <input v-model="form.skipSent" type="checkbox" />
        跳过已发送成功的人
      </label>
      <span class="mini muted">体检不通过时</span>
      <select v-model="form.onError" style="width: 150px">
        <option value="abort">取消发送（推荐）</option>
        <option value="send">仍然发送</option>
      </select>
    </div>

    <p class="mini muted">
      下次运行：<b>{{ nextText }}</b> · 上次运行：{{ lastText }}
    </p>
    <p v-if="st?.lastResult" class="mini" :class="{ 'res-err': /失败|取消|跳过/.test(st.lastResult) }">
      上次结果：{{ st.lastResult }}
    </p>
    <p class="mini muted">
      到点时自动把<b>当前工资表里所有人</b>发一遍（先跑一次体检）。服务必须保持运行：关掉窗口或关机就不会发；开机后若已超过计划时间 1 小时，会跳过这次不再补发。
    </p>
  </div>
</template>

<style scoped>
.card-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.card-head h3 {
  margin: 0;
}
.toolbar {
  margin-bottom: 8px;
}
.res-err {
  color: var(--danger);
}
</style>

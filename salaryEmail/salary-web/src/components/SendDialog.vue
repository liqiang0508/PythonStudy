<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { api } from '../api'
import type { CheckReport, EmployeeSummary, JobStatus } from '../../shared/types'

const props = defineProps<{ ids: string[]; employees: EmployeeSummary[] }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'done'): void
  (e: 'error', v: string): void
}>()

const force = ref(false)
const started = ref(false)
const job = ref<JobStatus | null>(null)
const timer = ref<number | null>(null)
/** 发送前体检：有必须处理的问题时需先勾选确认 */
const report = ref<CheckReport | null>(null)
const ack = ref(false)

onMounted(async () => {
  try {
    report.value = await api.check()
  } catch {
    /* 体检失败不阻断发送 */
  }
})

/** 与本次发送相关的问题：全局问题（无 ids）+ 命中选中人员的问题 */
const relatedIssues = computed(() => {
  const r = report.value
  if (!r) return []
  const sel = new Set(props.ids)
  return r.issues.filter((i) => !i.ids || i.ids.some((id) => sel.has(id)))
})
const blocking = computed(() => relatedIssues.value.filter((i) => i.level === 'error'))
const canStart = computed(() => !blocking.value.length || ack.value)

const targets = computed(() => props.employees.filter((e) => props.ids.includes(e.id)))
const invalidCount = computed(() => targets.value.filter((e) => !e.valid).length)
const sentCount = computed(() => targets.value.filter((e) => e.lastStatus === 'success').length)
const percent = computed(() => {
  const j = job.value
  if (!j || !j.total) return 0
  return Math.round((j.done / j.total) * 100)
})

function stopTimer() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

onUnmounted(stopTimer)

async function start() {
  try {
    const { jobId } = await api.send(props.ids, force.value)
    started.value = true
    timer.value = window.setInterval(poll, 600)
    await poll(jobId)
  } catch (e: any) {
    emit('error', e.message)
    emit('close')
  }
}

async function poll(jobId?: string) {
  const id = jobId || job.value?.id
  if (!id) return
  const j = await api.job(id)
  job.value = j
  if (j.state !== 'running') {
    stopTimer()
    emit('done')
  }
}

async function cancel() {
  if (!job.value) return
  await api.cancelJob(job.value.id)
}
</script>

<template>
  <div class="modal-mask" @click.self="started ? null : emit('close')">
    <div class="modal">
      <header>
        {{ started ? '发送中…' : `确认发送给 ${props.ids.length} 人` }}
      </header>

      <div class="body">
        <template v-if="!started">
          <div class="result-list">
            <div v-for="t in targets" :key="t.id" class="row">
              <span>{{ t.name }}</span>
              <span class="muted">{{ t.email }}</span>
              <span class="spacer" />
              <span v-if="!t.valid" class="badge warn">邮箱无效</span>
              <span v-else-if="t.lastStatus === 'success'" class="badge success">已发送</span>
              <span v-else-if="t.lastStatus === 'failed'" class="badge failed">失败</span>
              <span v-else class="badge pending">未发送</span>
            </div>
          </div>

          <div style="margin-top: 14px">
            <label class="check">
              <input v-model="force" type="checkbox" />
              强制重发（忽略“已发送”状态，勾选会重复发送）
            </label>
          </div>

          <div v-if="invalidCount" class="alerts">
            有 {{ invalidCount }} 人邮箱无效，将不会发送。
          </div>
          <div v-if="!force && sentCount" class="alerts">
            有 {{ sentCount }} 人已发送成功，默认会跳过；需要重发请勾选“强制重发”。
          </div>

          <div v-if="relatedIssues.length" class="alerts">
            <b>发送前体检：{{ blocking.length ? '有必须处理的问题' : '有需要留意的地方' }}</b>
            <ul>
              <li v-for="(i, k) in relatedIssues" :key="k">
                <span :style="{ color: i.level === 'error' ? 'var(--danger)' : undefined }">
                  {{ i.level === 'error' ? '【必须处理】' : '【留意】' }}{{ i.text }}
                </span>
              </li>
            </ul>
            <label v-if="blocking.length" class="check" style="margin-top: 6px">
              <input v-model="ack" type="checkbox" />
              我已知悉上述问题，仍要发送
            </label>
          </div>
        </template>

        <template v-else-if="job">
          <div class="progress"><div :style="{ width: percent + '%' }" /></div>
          <div class="mini muted">
            进度 {{ job.done }}/{{ job.total }} ·
            <span style="color: var(--success)">成功 {{ job.success }}</span> ·
            <span style="color: var(--danger)">失败 {{ job.failed }}</span> ·
            跳过 {{ job.skipped }}
          </div>
          <div class="result-list" style="margin-top: 12px">
            <div v-for="(r, i) in job.results" :key="i" class="row">
              <span>{{ r.name }}</span>
              <span class="muted">{{ r.email }}</span>
              <span class="spacer" />
              <span v-if="r.skipped" class="badge pending">已跳过</span>
              <span v-else-if="r.ok" class="badge success">成功</span>
              <span v-else class="badge failed">失败</span>
              <span class="msg">{{ r.error }}</span>
            </div>
          </div>
        </template>
      </div>

      <footer>
        <template v-if="!started">
          <button class="btn" @click="emit('close')">取消</button>
          <button class="btn primary" :disabled="!canStart" @click="start">确认发送</button>
        </template>
        <template v-else>
          <button v-if="job?.state === 'running'" class="btn danger" @click="cancel">中止发送</button>
          <button class="btn primary" :disabled="job?.state === 'running'" @click="emit('close')">
            {{ job?.state === 'running' ? '发送中…' : '完成' }}
          </button>
        </template>
      </footer>
    </div>
  </div>
</template>

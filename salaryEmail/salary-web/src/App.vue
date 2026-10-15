<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { api } from './api'
import type { EmployeeSummary, ImportResult, LogEntry } from '../shared/types'
import LoginView from './components/LoginView.vue'
import ImportPanel from './components/ImportPanel.vue'
import EmployeeTable from './components/EmployeeTable.vue'
import PreviewModal from './components/PreviewModal.vue'
import SendDialog from './components/SendDialog.vue'
import LogPanel from './components/LogPanel.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import ContactsPanel from './components/ContactsPanel.vue'
import BindEmailModal from './components/BindEmailModal.vue'
import CheckPanel from './components/CheckPanel.vue'
import SchedulePanel from './components/SchedulePanel.vue'

type Tab = 'send' | 'logs' | 'contacts' | 'settings'

const booted = ref(false)
const needPassword = ref(false)
const loggedIn = ref(false)
const tab = ref<Tab>('send')
const employees = ref<EmployeeSummary[]>([])
const source = ref<string | null>(null)
const importedAt = ref<string | null>(null)
const logs = ref<LogEntry[]>([])
const selected = ref<string[]>([])
const previewId = ref<string | null>(null)
const bindId = ref<string | null>(null)
const sendIds = ref<string[]>([])
/** 递增即触发体检面板重新检查（导入 / 清空 / 发送后） */
const checkVersion = ref(0)
const toasts = ref<{ id: number; text: string; kind: 'ok' | 'err' }[]>([])

function notify(text: string, kind: 'ok' | 'err' = 'ok') {
  const id = Date.now() + Math.random()
  toasts.value.push({ id, text, kind })
  setTimeout(() => (toasts.value = toasts.value.filter((t) => t.id !== id)), 3500)
}

async function loadEmployees() {
  const r = await api.employees()
  employees.value = r.employees
  source.value = r.meta.source
  importedAt.value = r.meta.importedAt
  selected.value = selected.value.filter((id) => r.employees.some((e) => e.id === id))
}

async function loadLogs() {
  logs.value = (await api.logs()).logs
}

async function boot() {
  try {
    const st = await api.authState()
    needPassword.value = st.needPassword
    loggedIn.value = st.loggedIn
    if (!st.needPassword || st.loggedIn) await Promise.all([loadEmployees(), loadLogs()])
  } catch (e: any) {
    notify(e.message || '初始化失败', 'err')
  } finally {
    booted.value = true
  }
}

onMounted(boot)

function onImported(res: ImportResult) {
  employees.value = res.employees
  source.value = res.file
  importedAt.value = new Date().toISOString()
  selected.value = []
  checkVersion.value++
  notify(`已导入 ${res.employees.length} 人`)
}

function onCleared() {
  employees.value = []
  selected.value = []
  source.value = null
  importedAt.value = null
  checkVersion.value++
}

async function onResolve() {
  try {
    const r = await api.resolveEmails()
    employees.value = r.employees
    if (r.unmatched) notify(`仍有 ${r.unmatched} 人未匹配到邮箱`, 'err')
    else notify('已用通讯录重新匹配邮箱')
  } catch (e: any) {
    notify(e.message, 'err')
  }
}

const bindTarget = computed(() => employees.value.find((e) => e.id === bindId.value) ?? null)

async function onSent() {
  await Promise.all([loadEmployees(), loadLogs()])
  sendIds.value = []
  checkVersion.value++
}

async function doLogout() {
  await api.logout()
  loggedIn.value = false
  employees.value = []
  logs.value = []
}
</script>

<template>
  <LoginView v-if="booted && needPassword && !loggedIn" @success="loggedIn = true; boot()" />

  <template v-else-if="booted">
    <div class="app-header">
      <div>
        <h1>工资条发送系统</h1>
        <div class="sub">按工资表批量发送工资条</div>
      </div>
      <button v-if="needPassword" class="btn sm" @click="doLogout">退出登录</button>
    </div>

    <div class="tabs">
      <button :class="{ active: tab === 'send' }" @click="tab = 'send'">工资发送</button>
      <button :class="{ active: tab === 'logs' }" @click="tab = 'logs'">发送日志</button>
      <button :class="{ active: tab === 'contacts' }" @click="tab = 'contacts'">员工管理</button>
      <button :class="{ active: tab === 'settings' }" @click="tab = 'settings'">系统设置</button>
    </div>

    <template v-if="tab === 'send'">
      <!-- 当前导入的工资表只在这里展示，其它 Tab 不出现 -->
      <div class="source-bar">
        当前表格：<b>{{ source || '未导入' }}</b>
        <span v-if="importedAt" class="mini muted">
          · 导入时间 {{ new Date(importedAt).toLocaleString('zh-CN') }}
        </span>
      </div>
      <ImportPanel :source="source" @imported="onImported" @cleared="onCleared" @error="notify($event, 'err')" />
      <CheckPanel :version="checkVersion" @error="notify($event, 'err')" />
      <EmployeeTable
        v-model:selected="selected"
        :employees="employees"
        @preview="previewId = $event"
        @send-one="sendIds = [$event]"
        @send-selected="sendIds = $event"
        @bind="bindId = $event"
        @resolve="onResolve"
      />
      <SchedulePanel @done="onSent" @error="notify($event, 'err')" />
    </template>

    <LogPanel v-else-if="tab === 'logs'" :logs="logs" @refresh="loadLogs" @error="notify($event, 'err')" />
    <ContactsPanel
      v-else-if="tab === 'contacts'"
      @changed="loadEmployees"
      @error="notify($event, 'err')"
    />
    <SettingsPanel v-else @error="notify($event, 'err')" @saved="notify('设置已保存')" />

    <PreviewModal v-if="previewId" :id="previewId" @close="previewId = null" />
    <BindEmailModal
      v-if="bindTarget"
      :employee="bindTarget"
      @close="bindId = null"
      @done="bindId = null; loadEmployees()"
      @error="notify($event, 'err')"
    />
    <SendDialog
      v-if="sendIds.length"
      :ids="sendIds"
      :employees="employees"
      @close="sendIds = []"
      @done="onSent"
      @error="notify($event, 'err')"
    />

    <div class="toast-wrap">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="t.kind">{{ t.text }}</div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { api } from '../api'
import type { SettingsView } from '../../shared/types'

const emit = defineEmits<{ (e: 'saved'): void; (e: 'error', v: string): void }>()

const form = reactive({
  smtpHost: '',
  smtpPort: 465,
  secure: true,
  allowInsecureTLS: false,
  smtpUser: '',
  smtpPass: '',
  senderName: '',
  subjectTemplate: '',
  bcc: '',
  retry: 2,
  delayMs: 1000,
  nameColumn: '姓名',
  emailColumn: '邮箱',
  useContacts: true,
  empNoColumn: '工号',
})
const passSet = ref(false)
const loading = ref(false)
const testTo = ref('')
const testing = ref(false)
const testMsg = ref('')

onMounted(async () => {
  const s: SettingsView = await api.settings()
  Object.assign(form, {
    smtpHost: s.smtpHost,
    smtpPort: s.smtpPort,
    secure: s.secure,
    allowInsecureTLS: s.allowInsecureTLS,
    smtpUser: s.smtpUser,
    senderName: s.senderName,
    subjectTemplate: s.subjectTemplate,
    bcc: s.bcc,
    retry: s.retry,
    delayMs: s.delayMs,
    nameColumn: s.nameColumn,
    emailColumn: s.emailColumn,
    useContacts: s.useContacts,
    empNoColumn: s.empNoColumn,
  })
  passSet.value = s.smtpPassSet
  form.smtpPass = ''
  testTo.value = s.smtpUser
})

async function save() {
  loading.value = true
  try {
    const s = await api.saveSettings({ ...form })
    passSet.value = s.smtpPassSet
    form.smtpPass = ''
    emit('saved')
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    loading.value = false
  }
}

async function test() {
  testing.value = true
  testMsg.value = ''
  try {
    await api.testMail(testTo.value)
    testMsg.value = `测试邮件已发送至 ${testTo.value}，请查收。`
  } catch (e: any) {
    emit('error', e.message)
  } finally {
    testing.value = false
  }
}
</script>

<template>
  <div class="card">
    <h3>邮件服务设置</h3>
    <div class="grid-2">
      <div class="field">
        <span>SMTP 服务器</span>
        <input v-model="form.smtpHost" type="text" placeholder="smtp.qq.com" />
      </div>
      <div class="field">
        <span>端口</span>
        <input v-model.number="form.smtpPort" type="number" />
      </div>
      <div class="field">
        <span>发件邮箱</span>
        <input v-model="form.smtpUser" type="text" placeholder="hr@company.com" />
      </div>
      <div class="field">
        <span>授权码 / 密码{{ passSet ? '（已保存，留空则不修改）' : '' }}</span>
        <input v-model="form.smtpPass" type="password" autocomplete="new-password" />
      </div>
      <div class="field">
        <span>发件人显示名</span>
        <input v-model="form.senderName" type="text" placeholder="人事部" />
      </div>
      <div class="field">
        <span>邮件主题模板（支持 {sheet} {name}）</span>
        <input v-model="form.subjectTemplate" type="text" placeholder="{sheet} 工资条" />
      </div>
      <div class="field">
        <span>密送留档邮箱（多个用逗号分隔，可留空）</span>
        <input v-model="form.bcc" type="text" />
      </div>
      <div class="field">
        <span>每封间隔（毫秒）</span>
        <input v-model.number="form.delayMs" type="number" />
      </div>
      <div class="field">
        <span>失败重试次数</span>
        <input v-model.number="form.retry" type="number" />
      </div>
      <div class="field">
        <span>默认姓名列名</span>
        <input v-model="form.nameColumn" type="text" />
      </div>
      <div class="field">
        <span>默认邮箱列名（留空 = 工资表不含邮箱列）</span>
        <input v-model="form.emailColumn" type="text" placeholder="留空则完全用通讯录" />
      </div>
    </div>

    <div style="margin-top: 12px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center">
      <label class="check"><input v-model="form.secure" type="checkbox" /> 使用 SSL（465 端口选，25/587 取消）</label>
      <label class="check"><input v-model="form.allowInsecureTLS" type="checkbox" /> 忽略证书错误（自签名证书时选）</label>
    </div>

    <div style="margin-top: 16px; display: flex; gap: 10px">
      <button class="btn primary" :disabled="loading" @click="save">保存设置</button>
    </div>
  </div>

  <div class="card">
    <h3>员工邮箱匹配</h3>
    <div class="grid-2">
      <div class="field">
        <span>工资表中的工号列名（同名时用它区分）</span>
        <input v-model="form.empNoColumn" type="text" placeholder="工号" />
      </div>
    </div>
    <div style="margin-top: 12px">
      <label class="check">
        <input v-model="form.useContacts" type="checkbox" />
        导入工资表时用「员工管理」通讯录自动匹配邮箱（关闭则只用表格里的邮箱列）
      </label>
    </div>
    <p class="mini muted" style="margin-top: 8px">
      匹配规则：先按<b>姓名</b>在通讯录里找 → 同名时用工资表里的<b>工号</b>区分 → 姓名没匹配上时用<b>工号</b>兜底 →
      仍无法确定则标记为未匹配，在列表里点「补邮箱」手动指定。
    </p>
    <div style="margin-top: 12px">
      <button class="btn primary" :disabled="loading" @click="save">保存设置</button>
    </div>
  </div>

  <div class="card">
    <h3>发送测试邮件</h3>
    <div class="toolbar">
      <input v-model="testTo" type="text" placeholder="接收测试邮件的邮箱" style="width: 260px" />
      <button class="btn" :disabled="testing || !testTo" @click="test">
        {{ testing ? '发送中…' : '发送测试邮件' }}
      </button>
    </div>
    <p class="mini muted">会先校验 SMTP 连接，再发送一封简单邮件，用于确认配置正确。</p>
    <p v-if="testMsg" class="mini" style="color: var(--success)">{{ testMsg }}</p>
  </div>
</template>

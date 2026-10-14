<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { api } from '../api'
import type { Contact, EmployeeSummary } from '../../shared/types'

const props = defineProps<{ employee: EmployeeSummary }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'done'): void
  (e: 'error', v: string): void
}>()

const contacts = ref<Contact[]>([])
const keyword = ref(props.employee.name)
const manual = ref('')
const saving = ref(false)

onMounted(async () => {
  contacts.value = (await api.contacts()).contacts
})

const matched = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  const list = contacts.value.filter((c) => c.active)
  if (!kw) return list.slice(0, 30)
  return list
    .filter((c) =>
      `${c.name} ${c.email} ${c.empNo} ${c.department}`.toLowerCase().includes(kw),
    )
    .slice(0, 30)
})

async function bind(payload: { contactId?: string; email?: string }) {
  saving.value = true
  try {
    await api.bindEmail(props.employee.id, payload)
    emit('done')
  } catch (e: any) {
    emit('error', e.message)
    emit('close')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="modal-mask" @click.self="emit('close')">
    <div class="modal" style="max-width: 560px">
      <header>为「{{ props.employee.name }}」指定邮箱</header>
      <div class="body">
        <div class="field">
          <span>在通讯录中查找（点击即可选用他的邮箱）</span>
          <input v-model="keyword" type="text" placeholder="输入姓名 / 工号 / 邮箱" />
        </div>

        <div class="result-list" style="margin-top: 10px">
          <div v-if="!matched.length" class="muted" style="padding: 10px 0">
            没有匹配的通讯录员工，可在下方手动填写
          </div>
          <button
            v-for="c in matched"
            :key="c.id"
            class="btn sm"
            style="margin: 4px 6px 0 0; text-align: left"
            :disabled="saving"
            @click="bind({ contactId: c.id })"
          >
            {{ c.name }}<span v-if="c.empNo">（{{ c.empNo }}）</span> · {{ c.email }}
          </button>
        </div>

        <div class="field" style="margin-top: 18px">
          <span>或手动填写邮箱</span>
          <div style="display: flex; gap: 8px; margin-top: 4px">
            <input v-model="manual" type="text" placeholder="name@company.com" style="flex: 1" />
            <button class="btn" :disabled="saving || !manual" @click="bind({ email: manual })">
              使用此邮箱
            </button>
          </div>
        </div>
      </div>
      <footer>
        <button class="btn" @click="emit('close')">关闭</button>
      </footer>
    </div>
  </div>
</template>

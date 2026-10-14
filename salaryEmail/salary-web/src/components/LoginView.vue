<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../api'

const emit = defineEmits<{ (e: 'success'): void }>()
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const r = await api.login(password.value)
    if (r.ok) emit('success')
    else error.value = r.error || '登录失败'
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="modal-mask">
    <div class="modal" style="max-width: 380px">
      <header>工资条发送系统</header>
      <div class="body">
        <div class="field">
          <span>访问密码</span>
          <input
            v-model="password"
            type="password"
            placeholder="请输入访问密码"
            @keyup.enter="submit"
          />
        </div>
        <p v-if="error" class="mini" style="color: var(--danger); margin-top: 10px">{{ error }}</p>
      </div>
      <footer>
        <button class="btn primary" :disabled="loading || !password" @click="submit">
          {{ loading ? '登录中…' : '登录' }}
        </button>
      </footer>
    </div>
  </div>
</template>

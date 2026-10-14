<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { api } from '../api'

const props = defineProps<{ id: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const html = ref('')
const subject = ref('')
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    const r = await api.render(props.id)
    html.value = r.html
    subject.value = r.subject
  } catch {
    html.value = '<p>加载失败</p>'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => props.id, load)
</script>

<template>
  <div class="modal-mask" @click.self="emit('close')">
    <div class="modal wide">
      <header>
        邮件预览<span class="mini muted" style="font-weight: 400"> · {{ subject }}</span>
        <span class="spacer" />
        <button class="btn sm" @click="emit('close')">关闭</button>
      </header>
      <div class="body">
        <div v-if="loading" class="empty">加载中…</div>
        <iframe v-else class="preview-frame" :srcdoc="html" title="工资条预览" />
      </div>
      <footer>
        <span class="mini muted">以下为收件人实际收到的邮件样式</span>
      </footer>
    </div>
  </div>
</template>

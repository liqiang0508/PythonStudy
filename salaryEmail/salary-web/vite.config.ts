import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  // 读 .env / .env.{mode} / .env.local（'' = 不限制前缀，端口类变量也能读到）
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.WEB_PORT || 8000)
  const backend = env.BACKEND || `http://localhost:${Number(env.PORT || 3001)}`

  return {
    plugins: [vue()],
    server: {
      port,
      proxy: {
        '/api': { target: backend, changeOrigin: true },
      },
    },
    build: { outDir: 'dist', chunkSizeWarningLimit: 900 },
  }
})

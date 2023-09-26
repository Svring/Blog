import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'client',
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // 将所有 /api 开头的请求代理到 Node.js 服务器
    }
  }
})

process.env.BROWSER = "safari";

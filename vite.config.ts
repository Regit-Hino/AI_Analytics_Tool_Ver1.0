import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 5173,
    host: true,
    open: true
  },
  base: process.env.NODE_ENV === 'production' ? '/AI_Analytics_Tool_Ver1.0/' : '/'
})
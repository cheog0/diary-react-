import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api'로 시작하는 모든 요청을 localhost:8080으로 전달
      '/api': {
        target: 'http://localhost:8080',  // Spring 서버 주소
        changeOrigin: true,  // 원본 요청 헤더에서 호스트 헤더를 타겟 URL로 변경
        secure: false,  // HTTPS 사용 시 필요
      },
    },
  },
})

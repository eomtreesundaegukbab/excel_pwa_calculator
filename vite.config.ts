import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // ✅ GitHub Pages 배포용 (저장소 이름과 동일해야 함)
  base: '/excel_pwa_calculator/',

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      // ✅ dev에서도 manifest/service worker가 보이게
      devOptions: {
        enabled: true
      },

      manifest: {
        name: 'Excel Formula Calculator',
        short_name: 'Calc',

        // ✅ GitHub Pages 경로에서도 정상 동작
        start_url: '/excel_pwa_calculator/',
        scope: '/excel_pwa_calculator/',

        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          { src: '/excel_pwa_calculator/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/excel_pwa_calculator/pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
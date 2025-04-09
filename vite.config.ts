import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), tailwindcss()],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
    proxy: {
      // Proxy API requests to backend during development
      '/api': {
        target: 'http://localhost:8500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Base path for GitHub Pages deployment
  // Change this to match your repository name if different
  // For local development, use '/' (default)
  // For production/GitHub Pages, use '/PetGroomingApp/'
  base: mode === 'production' ? '/PetGroomingApp/' : '/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
}))


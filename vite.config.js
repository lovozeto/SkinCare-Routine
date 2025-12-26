import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // Si estamos en producción (GitHub Actions) usa el nombre del repo
    // Si estamos en desarrollo (Tu Codespace) usa la raíz '/'
    base: mode === 'production' ? '/SkinCare-Routine/' : '/',
  }
})
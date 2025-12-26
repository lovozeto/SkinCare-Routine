import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Reemplaza 'nombre-de-tu-repo' por el nombre exacto de tu repositorio en GitHub
  // Si tu repo se llama "rutina-mama", pon base: '/rutina-mama/'
  base: '/nombre-de-tu-repo/', 
})
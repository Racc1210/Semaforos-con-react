import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Semaforos-con-react/Semaforo-React",
  plugins: [react()],
})

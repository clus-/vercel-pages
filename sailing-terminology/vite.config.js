import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/sailing-terminology/',
  plugins: [react()],
})

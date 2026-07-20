import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/torn-faction-management/',  // replace with your actual repo name
  plugins: [react()],
})

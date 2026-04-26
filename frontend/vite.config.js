import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite config with React and Tailwind CSS plugins
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

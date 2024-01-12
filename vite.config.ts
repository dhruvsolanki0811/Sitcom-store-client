import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.ts','./src/**/**/*.ts', './src/**/*.tsx', './src/**/**/*.tsx','./src/**/**/**/*.ts','./src/**/**/**/*.tsx'],
      exclude: [],
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': 'https://sitcomstore.onrender.com',
    },
  },
})
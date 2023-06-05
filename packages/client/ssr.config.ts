import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, '/src/ssr.tsx'),
      name: 'client',
      formats: ['cjs'],
    },
    minify: false,
    rollupOptions: {
      input: '/src/ssr.tsx',
      output: {
        dir: 'dist-ssr',
      },
    },
  },
})

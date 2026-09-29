import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { copyFileSync, existsSync } from 'fs'

// Copies the pdf.js worker from node_modules into public/ so it is always
// served at /pdf.worker.min.js — works on every deployment host without CDN.
function copyPdfWorker() {
  return {
    name: 'copy-pdf-worker',
    buildStart() {
      const src = resolve(
        'node_modules/pdfjs-dist/build/pdf.worker.min.js'
      )
      const dest = resolve('public/pdf.worker.min.js')
      if (existsSync(src)) {
        copyFileSync(src, dest)
        console.log('[copy-pdf-worker] Copied pdf.worker.min.js → public/')
      } else {
        console.warn('[copy-pdf-worker] Worker not found at:', src)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyPdfWorker(),
  ],
})

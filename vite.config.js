import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  worker: {
    format: 'es',
    plugins: [preact()]
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: false,
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks: {
          'wasm-runtime': ['onnxruntime-web', '@huggingface/transformers'],
          'ocr-engine': ['tesseract.js'],
          'pdf-processor': ['pdfjs-dist'],
          'nlp-models': ['compromise'],
          'vendor': ['preact', 'preact-router']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['onnxruntime-web', '@huggingface/transformers'],
    include: ['tesseract.js', 'pdfjs-dist', 'compromise']
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
})

import path from "path"
// import react from "@vitejs/plugin-react"
import preact from '@preact/preset-vite'
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [preact()],
  build: {
    sourcemap: true,
    minify: 'esbuild',
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vexflow')) {
            return 'vexflow';
          }
        }
      }
    }
  },
  assetsInclude: ['**/*.riv'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // 增加 chunk size 警告限制到 1000KB
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('chart.js') || id.includes('react-chartjs-2')) return 'charts';
          if (id.includes('browser-image-compression')) return 'image-tools';
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) return 'react';
        }
      }
    }
  }
})

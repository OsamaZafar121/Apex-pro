import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    ViteImageOptimizer({
      // Default image optimization settings
      png: { quality: 80 },
      jpeg: { quality: 75 },
      jpg: { quality: 75 },
      webp: { quality: 75, lossless: false },
      avif: { quality: 70, lossless: false },
      // Exclude site icon from heavy optimization to preserve quality
      exclude: ['**/siteicon.jpg', '**/apexlogo.png', '**/footerlog.png'],
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Enable minification with terser
    minify: 'terser',
    // Generate source maps for production debugging
    sourcemap: false,
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 1500,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Enable assets inline limit
    assetsInlineLimit: 4096,
    // Rollup output options
    rollupOptions: {
      output: {
        // Use content-based hashes for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
        // Manual chunking for better code splitting
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router-dom')) {
              return 'router-vendor';
            }
            if (id.includes('react-icons')) {
              return 'icons-vendor';
            }
            return 'vendor';
          }
        }
      }
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-icons'],
  },
  // Enable production optimizations
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})

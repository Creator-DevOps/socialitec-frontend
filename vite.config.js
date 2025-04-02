import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import path from "path";

export default defineConfig({
   base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/components/layouts'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@icons': path.resolve(__dirname, 'src/assets/images/icons'),
      '@png': path.resolve(__dirname, 'src/assets/images/png'),
      '@public': path.resolve(__dirname, 'public'),
      '@locales': path.resolve(__dirname, 'public/locales'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@modules': path.resolve(__dirname, 'src/components/modules'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@base': path.resolve(__dirname, './'), 
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
        }
      }
    },
    server: {
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [
          { from: /\/login/, to: '/index.html' },
          { from: /\/.*/, to: '/index.html' } 
        ]
      }
    },
  },
});
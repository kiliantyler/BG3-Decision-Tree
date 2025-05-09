import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use React Fast Refresh
      fastRefresh: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'contexts': path.resolve(__dirname, './src/contexts'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'data': path.resolve(__dirname, './src/data'),
      'styles': path.resolve(__dirname, './src/styles'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
    port: 5173,
    open: false,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
  // Simple configuration without complex loader options
  esbuild: {
    jsx: 'automatic'
  }
});
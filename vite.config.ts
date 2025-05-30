import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@component': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/contexts'),
      '@hook': path.resolve(__dirname, './src/hooks'),
      '@data': path.resolve(__dirname, './src/data'),
      '@style': path.resolve(__dirname, './src/styles'),
      '@asset': path.resolve(__dirname, './src/assets'),
    },
    extensions: ['.ts', '.tsx', '.json'],
  },
});

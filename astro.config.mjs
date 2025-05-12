import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    // Enable React for UI components
    react({
      include: ['**/*.jsx', '**/*.tsx'],
    }),
  ],
  // Add Vercel adapter for deployment
  adapter: vercel(),
  // Set up path aliases to match Vite configuration
  vite: {
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
    // Match Vite server settings
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
      port: 5173,
      open: false,
    },
    // Match Vite build settings
    build: {
      target: 'esnext',
    },
    // Match Vite esbuild settings
    esbuild: {
      jsx: 'automatic'
    }
  },
  // Output directory
  outDir: './dist',
});

# BG3 Decision Tree - Astro Version

This project has been converted from Vite to Astro. Astro is a modern static site generator that allows you to use your favorite UI components and libraries with less client-side JavaScript.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Project Structure

- `src/pages/` - Astro pages
- `src/layouts/` - Astro layouts
- `src/components/` - React components
- `src/contexts/` - React contexts
- `src/hooks/` - React hooks
- `src/data/` - Data files
- `src/styles/` - CSS files
- `public/` - Static assets

## Astro Configuration

The Astro configuration is in `astro.config.mjs`. It includes:

- React integration for UI components
- Path aliases that match the original Vite configuration
- Server settings similar to the original Vite configuration

## Notes on the Conversion

- The application now uses Astro's file-based routing system
- React components are hydrated on the client using Astro's client directives
- The original Vite scripts are still available with the `vite:` prefix

## Original Vite Scripts

If you need to use the original Vite scripts, they are still available:

```bash
npm run vite:dev
npm run vite:build
npm run vite:preview
```

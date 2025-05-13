# Migration from Vite to Astro

This document outlines the steps taken to migrate the BG3 Decision Tree project from Vite to Astro.

## Changes Made

### 1. Removed Vite-specific Files

- Removed `vite.config.js`
- Removed `.vite` directory
- Removed `index.html` (Vite entry point)
- Removed `src/main.jsx` (Vite entry point)

### 2. Component Migration

- Converted React components to Astro components where appropriate
- Created `.astro` versions of all icon components:
  - `CloseIcon.astro`
  - `MinusIcon.astro`
  - `MoonIcon.astro`
  - `PlusIcon.astro`
  - `ResetIcon.astro`
  - `SearchIcon.astro`
  - `SunIcon.astro`
- Created `.astro` versions of UI components:
  - `CloseButton.astro`
  - `FitViewButton.astro`
  - `IconButton.astro`
  - `Modal.astro`
  - `ResetButton.astro`
  - `ThemeToggle.astro`
- Created `.astro` versions of layout components:
  - `App.astro`
  - `AppContent.astro`
  - `AppContainer.astro`
  - `ErrorState.astro`
  - `Footer.astro`
  - `Header.astro`
  - `LoadingState.astro`
- Created `.astro` versions of sidebar components:
  - `ActSection.astro`
  - `CategorySection.astro`
  - `DecisionNode.astro`
  - `LegendArea.astro`
  - `LegendRow.astro`
  - `SearchBar.astro`
  - `SectionTitle.astro`
  - `Sidebar.astro`
  - `SidebarContent.astro`
  - `SidebarHeader.astro`

### 3. File Organization

- Created `index.astro` files for component re-exports
- Maintained compatibility with existing React components
- Implemented proper namespacing to avoid conflicts

### 4. Configuration

- Added `astro.config.mjs` for Astro configuration
- Updated scripts in `package.json` to use Astro commands

## Benefits of Migration

1. **Improved Performance**: Astro's partial hydration model reduces the amount of JavaScript sent to the client, resulting in faster page loads.

2. **Better SEO**: Enhanced metadata and static rendering improve search engine visibility.

3. **Maintainable Code**: Clear separation of static and interactive components makes the codebase easier to maintain.

4. **Future-proof**: The hybrid approach makes it easier to add new features and optimize performance in the future.

## Remaining Components to Migrate

The following components are still React components and will be migrated to Astro in a future update:

### Debug Components

- `CanvasDataTab.jsx`
- `DebugModeBanner.jsx`
- `DebugPanel.jsx`
- `DebugTabs.jsx`
- `DebugToggleButton.jsx`
- `DecisionsTab.jsx`
- `DiagnosticSidebar.jsx`
- `SidebarDebugPanel.jsx`
- `StatsTab.jsx`

### Flowchart Components

- `BaseNode.jsx`
- `DecisionNode.jsx`
- `FlowChart.jsx`
- `OutcomeNode.jsx`

## Next Steps

To continue improving the application, you could:

1. Convert the remaining React components to Astro where appropriate
2. Further optimize client directives for React components
3. Implement more static pages using Astro's file-based routing
4. Add more Astro-specific features like content collections

# Technical Context: Baldur's Gate 3 Decision Flowchart

## Technologies Used

### Core Technologies

1. **React 19**: Modern UI library for building component-based interfaces
2. **TypeScript**: Strongly-typed JavaScript for improved developer experience and code quality
3. **Vite**: Fast build tool and development server
4. **ReactFlow**: Specialized library for node-based interfaces and flowcharts
   - Used for rendering and managing decision nodes and connections
   - Supports panning, zooming, and node selection
   - Allows custom node types
   - Provides background grid component
5. **Tailwind CSS**: Utility-first CSS framework for styling

### UI Component Libraries

1. **Shadcn UI**: A collection of reusable components built with Radix UI and Tailwind CSS
   - Most components have already been imported and will be customized as needed
   - Used components include Card, Collapsible, ContextMenu, and others
2. **Radix UI**: Unstyled, accessible UI primitives that power Shadcn components
   - Accordion, Alert Dialog, Avatar, Checkbox, Collapsible, Context Menu, etc.
   - Provides robust accessibility features
   - Handles complex UI interactions
3. **Class Variance Authority (CVA)**: For creating consistent component variants
4. **Tailwind Merge**: For resolving Tailwind CSS class conflicts
   - Used through the `cn` utility function
5. **Lucide React**: Icon library

### State Management

1. **React Context API**: For global state management
   - Currently used for theme management and sidebar visibility
   - Will be used for decision state management
2. **React Hooks**: For component-level state management
   - useState for local component state
   - useEffect for side effects and lifecycle management
   - Custom hooks for reusable logic
3. **Local Storage**: For persisting user preferences (e.g., theme, sidebar state)

### Development Tools

1. **ESLint**: Code linting
2. **Prettier**: Code formatting
3. **Storybook**: Component documentation and testing
   - Used for developing and testing components in isolation
   - Component stories are available for key components
4. **Vitest**: Testing framework
5. **TypeScript-ESLint**: TypeScript-specific linting rules
6. **Chromatic**: Visual testing platform

### Deployment & Analytics

1. **Vercel Analytics**: Performance tracking and user analytics

## Development Setup

### Environment Requirements

- **Node.js**: v22.15.0 or higher
- **Package Manager**: npm 10.0.0+ (also supports yarn, pnpm, or bun)

### Project Structure

```
src/
├── components/ # React components
│ ├── flowchart/ # Flowchart-related components
│ │ ├── decisionnode.tsx # Decision node component
│ │ ├── flowchart.tsx # Main flowchart component
│ │ └── *.stories.tsx # Storybook files
│ ├── sidebar/ # Sidebar components
│ │ ├── app-sidebar.tsx # Main sidebar component
│ │ ├── decision-row.tsx # Individual decision item
│ │ └── *.stories.tsx # Storybook files
│ ├── theme-provider.tsx # Theme provider component
│ └── ui/ # Reusable UI components
│   ├── button.tsx # Button component
│   ├── card.tsx # Card component
│   ├── option-box.tsx # Decision option component
│   └── ... # Other UI components
├── data/ # Game data
│ ├── acts/ # Act-specific data
│ │ ├── act1.ts
│ │ ├── act2.ts
│ │ └── act3.ts
│ ├── characters/ # Character data
│ │ ├── characters.ts
│ │ └── origin/ # Origin characters
│ └── decisions/ # Decision data organized by act
│   ├── decisions.ts
│   └── act1/ # Act 1 decisions
├── hooks/ # Custom React hooks
│ └── use-mobile.ts # Hook for detecting mobile devices
├── lib/ # Utility functions
│ └── utils.ts # General utility functions including cn()
├── types/ # TypeScript type definitions
│ ├── act.d.ts # Act type definitions
│ ├── character.d.ts # Character type definitions
│ ├── decision.d.ts # Decision type definitions
│ ├── location.d.ts # Location type definitions
│ └── region.d.ts # Region type definitions
└── utils/ # Helper functions
  ├── location.ts # Location-related utilities
  └── region.ts # Region-related utilities
```

### Build & Development Scripts

- **Development**: `npm run dev` - Starts the development server
- **Build**: `npm run build` - Builds the project for production
- **Preview**: `npm run preview` - Previews the production build
- **Lint**: `npm run lint` - Runs ESLint
- **Storybook**: `npm run storybook` - Starts Storybook for component development

## Technical Constraints

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- No explicit support for IE11 or older browsers

### Performance Considerations

1. **Rendering Optimization**:
   - Large flowcharts with many nodes can impact performance
   - ReactFlow has performance implications for complex graphs
   - May need virtualization for large decision trees
2. **State Management**:
   - Complex decision trees require efficient state updates
   - Need to minimize unnecessary re-renders
   - Consider memoization for expensive calculations
3. **Memory Usage**:
   - Large datasets need careful management to avoid memory issues
   - Consider lazy loading for infrequently accessed data
4. **Canvas Rendering**:
   - ReactFlow's canvas rendering has performance implications for complex graphs
   - Need to optimize node and edge rendering

### Accessibility Requirements

1. **Keyboard Navigation**: All features should be accessible via keyboard
2. **Screen Reader Support**: UI components should work with screen readers
   - Using Radix UI primitives helps ensure accessibility
   - Need to ensure custom components maintain accessibility
3. **Color Contrast**: Visual indicators should meet WCAG contrast requirements
4. **Focus Management**: Proper focus handling for interactive elements
5. **ARIA Attributes**: Properly implemented where needed

### Mobile Considerations

1. **Touch Interactions**:
   - Different interaction model for touch devices
   - Need larger hit areas for touch targets
   - Consider implementing pinch-to-zoom for flowchart
2. **Screen Size**:
   - Limited space for complex flowcharts on mobile
   - May need alternative views for small screens
   - Consider collapsible sections for better space usage
3. **Performance**:
   - Mobile devices may have lower performance capabilities
   - Need to optimize rendering for mobile CPUs
   - Consider reducing visual effects on mobile

## Dependencies

### Production Dependencies

Key dependencies include:

- **@radix-ui/react-\*** components: UI primitives
- **class-variance-authority**: For component variants
- **clsx**: For conditional class names
- **lucide-react**: Icon library
- **next-themes**: Theme management
- **react** and **react-dom**: Core React libraries
- **reactflow**: Flowchart visualization
- **tailwindcss**: Styling framework
- **zod**: Schema validation

### Development Dependencies

Key development dependencies include:

- **@types/\*** packages: TypeScript type definitions
- **@vitejs/plugin-react**: Vite plugin for React
- **eslint** and related plugins: Code linting
- **prettier**: Code formatting
- **storybook**: Component documentation
- **typescript**: TypeScript compiler
- **vite**: Build tool
- **vitest**: Testing framework

## Tool Usage Patterns

### ReactFlow Usage

- Using ReactFlow as the core flowchart engine
- Currently implemented with empty nodes and edges arrays
- Configuration includes:
  - Zoom limits (0.1 to 2x)
  - Background grid with cross pattern
  - Hidden attribution (via proOptions)
  - Empty handlers for node/edge changes
- Future improvements will include:
  - Custom node types for decision nodes
  - Edge definitions for relationships
  - Interaction handlers
  - Layout algorithms

### Tailwind CSS Usage

- Using utility classes for styling
- Leveraging the `cn` utility for conditional class names
- Following consistent spacing and color patterns
- Using Tailwind class composition for common patterns
- Example patterns observed:
  ```tsx
  className={cn('max-w-sm', 'items-center', 'hover:cursor-pointer', borderColor)}
  ```

### TypeScript Patterns

- Defining clear interfaces for data structures
  - Decision, DecisionOption interfaces
  - Act and Location type definitions
- Using type guards for runtime type checking
- Leveraging generics for reusable components
- Maintaining separate type definition files
- Using module declaration files (.d.ts)

### Component Development

- Creating reusable UI components in `src/components/ui`
- Building feature-specific components in dedicated directories
- Using Storybook for component development and documentation
- Following consistent naming conventions
- Component composition patterns:
  ```tsx
  <Card>
    <CardTitle>Title</CardTitle>
    <CardContent>Content</CardContent>
  </Card>
  ```

### State Management

- Using React Context for global state
  - ThemeProvider for theme state
  - SidebarProvider for sidebar visibility
- Leveraging local component state for UI-specific state
  - Using React.useState for component state
  ```tsx
  const [isOpen, setIsOpen] = React.useState(true)
  const [chosenOption, setChosenOption] = React.useState<
    DecisionOption | undefined
  >(undefined)
  ```
- Creating custom hooks for reusable state logic
- Using controlled components for form elements

### Testing Strategy

- Component testing with Storybook
  - Stories for key components like DecisionNode
- Unit testing with Vitest
- Visual regression testing with Chromatic
- Manual testing for complex interactions

## Configuration Files

- **tsconfig.json**: TypeScript configuration
- **tsconfig.app.json**: App-specific TypeScript config
- **tsconfig.node.json**: Node-specific TypeScript config
- **vite.config.ts**: Vite configuration
- **eslint.config.js**: ESLint configuration
- **.prettierrc.json5**: Prettier configuration
- **tailwind.config.js**: Tailwind CSS configuration

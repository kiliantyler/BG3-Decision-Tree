# Technical Context: Baldur's Gate 3 Decision Flowchart

## Technologies Used

### Core Technologies

1. **React 19**: Modern UI library for building component-based interfaces
2. **TypeScript**: Strongly-typed JavaScript for improved developer experience and code quality
3. **Vite**: Fast build tool and development server
4. **ReactFlow**: Specialized library for node-based interfaces and flowcharts
5. **Tailwind CSS**: Utility-first CSS framework for styling

### UI Component Libraries

1. **Shadcn UI**: A collection of reusable components built with Radix UI and Tailwind CSS
   - Most components have already been imported and will be customized as needed
2. **Radix UI**: Unstyled, accessible UI primitives that power Shadcn components
   - Accordion, Alert Dialog, Avatar, Checkbox, Collapsible, Context Menu, etc.
3. **Class Variance Authority (CVA)**: For creating consistent component variants
4. **Tailwind Merge**: For resolving Tailwind CSS class conflicts
5. **Lucide React**: Icon library

### State Management

1. **React Context API**: For global state management
2. **React Hooks**: For component-level state management
3. **Local Storage**: For persisting user preferences (e.g., theme, sidebar state)

### Development Tools

1. **ESLint**: Code linting
2. **Prettier**: Code formatting
3. **Storybook**: Component documentation and testing
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
│ ├── sidebar/ # Sidebar components
│ └── ui/ # Reusable UI components
├── data/ # Game data
│ ├── acts/ # Act-specific data
│ ├── characters/ # Character data
│ └── decisions/ # Decision data organized by act
├── hooks/ # Custom React hooks
├── lib/ # Utility functions
├── types/ # TypeScript type definitions
└── utils/ # Helper functions
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

1. **Rendering Optimization**: Large flowcharts with many nodes can impact performance
2. **State Management**: Complex decision trees require efficient state updates
3. **Memory Usage**: Large datasets need careful management to avoid memory issues
4. **Canvas Rendering**: ReactFlow's canvas rendering has performance implications for complex graphs

### Accessibility Requirements

1. **Keyboard Navigation**: All features should be accessible via keyboard
2. **Screen Reader Support**: UI components should work with screen readers
3. **Color Contrast**: Visual indicators should meet WCAG contrast requirements
4. **Focus Management**: Proper focus handling for interactive elements

### Mobile Considerations

1. **Touch Interactions**: Different interaction model for touch devices
2. **Screen Size**: Limited space for complex flowcharts on mobile
3. **Performance**: Mobile devices may have lower performance capabilities

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

### Tailwind CSS Usage

- Using utility classes for styling
- Leveraging the `cn` utility for conditional class names
- Following consistent spacing and color patterns

### TypeScript Patterns

- Defining clear interfaces for data structures
- Using type guards for runtime type checking
- Leveraging generics for reusable components
- Maintaining separate type definition files

### Component Development

- Creating reusable UI components in `src/components/ui`
- Building feature-specific components in dedicated directories
- Using Storybook for component development and documentation
- Following consistent naming conventions

### State Management

- Using React Context for global state
- Leveraging local component state for UI-specific state
- Creating custom hooks for reusable state logic
- Using controlled components for form elements

### Testing Strategy

- Component testing with Storybook
- Unit testing with Vitest
- Visual regression testing with Chromatic
- Manual testing for complex interactions

## Configuration Files

- **tsconfig.json**: TypeScript configuration
- **vite.config.ts**: Vite configuration
- **eslint.config.js**: ESLint configuration
- **.prettierrc.json5**: Prettier configuration
- **tailwind.config.js**: Tailwind CSS configuration

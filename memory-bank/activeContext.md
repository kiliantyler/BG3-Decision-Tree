# Active Context: Baldur's Gate 3 Decision Flowchart

## Current Work Focus

The project is currently in active development with a focus on implementing the core flowchart functionality. Based on the codebase examination, the following areas are being actively worked on:

1. **Core Flowchart Implementation**: Building out the ReactFlow integration for visualizing decision trees
2. **Decision Node Components**: Creating interactive components to represent game decisions
3. **Sidebar Implementation**: Developing the sidebar for accessing available decisions
4. **Data Structure Definition**: Establishing the TypeScript interfaces for game data
5. **UI Component Library**: Customizing Shadcn UI components (which have already been imported) based on Radix UI and Tailwind

## Recent Changes

Based on the repository state, recent development activities include:

1. **Project Setup**: Initial project setup with Vite, React 19, and TypeScript
2. **Component Structure**: Creation of core component structure (flowchart, sidebar, UI components)
3. **Data Modeling**: Definition of data types for acts, characters, and decisions
4. **UI Framework**: Implementation of theme support and basic layout
5. **Storybook Integration**: Setup of Storybook for component development

## Next Steps

The following tasks appear to be the logical next steps for development:

1. **Decision State Management**: Implement state management for decision selections
2. **Node Connection Logic**: Develop the logic for connecting related decision nodes
3. **Decision Data Population**: Expand the decision data with more game content
4. **Filtering and Search**: Implement filtering and search functionality for decisions
5. **Drag and Drop**: Enable drag-and-drop functionality for adding decisions to the flowchart
6. **Visual Styling**: Enhance the visual design of nodes and connections
7. **Mobile Responsiveness**: Improve the experience on smaller screens

## Active Decisions and Considerations

### Architecture Decisions

1. **State Management Approach**: Currently using React Context for global state, but may need to evaluate more robust solutions as complexity grows
2. **Data Organization**: Organizing decision data by acts and locations, with clear type definitions
3. **Component Granularity**: Balancing component reusability with specific functionality needs
4. **Styling Strategy**: Using Tailwind CSS with utility classes and the `cn` helper for conditional styling

### Technical Considerations

1. **Performance Optimization**: Need to ensure good performance with large decision trees
2. **TypeScript Type Safety**: Maintaining strong typing across the application
3. **Accessibility**: Ensuring all components are accessible and follow best practices
4. **Testing Strategy**: Determining the appropriate testing approach for interactive components

### User Experience Considerations

1. **Flowchart Clarity**: Ensuring the flowchart remains clear and understandable even with many nodes
2. **Interaction Design**: Creating intuitive interactions for selecting decisions and options
3. **Visual Feedback**: Providing clear visual feedback for user actions
4. **Information Density**: Balancing comprehensive information with visual simplicity

## Important Patterns and Preferences

### Code Style

1. **Component Structure**: Components are organized by feature area (flowchart, sidebar, ui)
2. **TypeScript Usage**: Strong typing with interfaces defined in dedicated type files
3. **Naming Conventions**: Clear, descriptive names for components and functions
4. **File Organization**: Related files are grouped in dedicated directories

### UI Patterns

1. **Component Composition**: Building complex UIs from smaller, reusable components
2. **Consistent Styling**: Using Tailwind utility classes with consistent patterns
3. **Accessibility First**: Ensuring all components are accessible by default
4. **Dark Mode Support**: Supporting both light and dark themes

### State Management

1. **Context Providers**: Using context providers for shared state
2. **Local Component State**: Managing component-specific state locally
3. **Controlled Components**: Using controlled components for form elements
4. **Custom Hooks**: Extracting reusable logic into custom hooks

## Learnings and Project Insights

### Technical Insights

1. **ReactFlow Integration**: Understanding the capabilities and limitations of ReactFlow for interactive flowcharts
2. **TypeScript Type Definitions**: Importance of clear type definitions for complex data structures
3. **Component Reusability**: Balancing specific functionality with reusable design

### Project Direction

1. **Feature Prioritization**: Focus on core flowchart functionality before adding additional features
2. **Data Completeness**: Need to expand decision data to cover more of the game
3. **User Feedback**: Plan to gather user feedback on the initial implementation
4. **Performance Monitoring**: Need to monitor performance as the decision tree grows

### Challenges and Solutions

1. **Complex Data Relationships**: Managing the complex relationships between game decisions
   - Solution: Clear type definitions and relationship modeling
2. **Visual Clarity**: Keeping the flowchart visually clear with many nodes
   - Solution: Thoughtful layout algorithms and visual design
3. **State Complexity**: Managing the state of multiple interconnected decisions
   - Solution: Well-structured state management with clear update patterns

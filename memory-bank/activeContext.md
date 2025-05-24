# Active Context: Baldur's Gate 3 Decision Flowchart

## Current Work Focus

The project is currently in active development with a focus on implementing the core flowchart functionality. Based on the codebase examination, the following areas are being actively worked on:

1. **Core Flowchart Implementation**: Building out the ReactFlow integration for visualizing decision trees
   - Basic ReactFlow setup is complete with nodes, edges, zoom controls, and background
   - Node and edge state management needs implementation
2. **Decision Node Components**: Creating interactive components to represent game decisions
   - DecisionNode component has initial implementation with collapsible options
   - Context menu functionality for node operations is in place
   - Option selection state is managed locally within components
3. **Sidebar Implementation**: Developing the sidebar for accessing available decisions
4. **Data Structure Definition**: Establishing the TypeScript interfaces for game data
5. **UI Component Library**: Customizing Shadcn UI components based on Radix UI and Tailwind

## Recent Changes

Based on the repository state, recent development activities include:

1. **Project Setup**: Initial project setup with Vite, React 19, and TypeScript
2. **Component Structure**: Creation of core component structure (flowchart, sidebar, UI components)
3. **Data Modeling**: Definition of data types for acts, characters, and decisions
4. **UI Framework**: Implementation of theme support and basic layout
5. **Storybook Integration**: Setup of Storybook for component development
6. **Decision Node Implementation**: Created collapsible decision nodes with option selection
7. **FlowChart Component**: Basic implementation of ReactFlow with background and panel support

## Next Steps

The following tasks appear to be the logical next steps for development:

1. **Decision State Management**: Implement global state management for decision selections
   - Create a central store for tracking selected options across all decisions
   - Implement state persistence using Context API or another state management solution
2. **Node Connection Logic**: Develop the logic for connecting related decision nodes
   - Implement edge creation based on prerequisites and unlocks
   - Handle visual representation of connections between decisions
3. **Flowchart Interaction Handlers**: Implement handlers for node changes, edge changes, and connections
4. **Decision Data Population**: Expand the decision data with more game content
5. **Filtering and Search**: Implement filtering and search functionality for decisions
6. **Drag and Drop**: Enable drag-and-drop functionality for adding decisions to the flowchart
7. **Visual Styling**: Enhance the visual design of nodes and connections

## Active Decisions and Considerations

### Architecture Decisions

1. **State Management Approach**:
   - Currently using React Context for global state, but may need to evaluate more robust solutions as complexity grows
   - Local component state is being used for UI interactions (like collapsible state)
   - Need to determine approach for synchronizing local component state with global decision state
2. **Data Organization**: Organizing decision data by acts and locations, with clear type definitions
3. **Component Granularity**:
   - Decision node component encapsulates display and interaction logic
   - FlowChart component handles overall canvas and node arrangement
4. **Styling Strategy**: Using Tailwind CSS with utility classes and the `cn` helper for conditional styling

### Technical Considerations

1. **Performance Optimization**:
   - Need to ensure good performance with large decision trees
   - ReactFlow's node rendering might need optimization for complex graphs
2. **TypeScript Type Safety**: Maintaining strong typing across the application
3. **Accessibility**: Ensuring all components are accessible and follow best practices
4. **Testing Strategy**: Determining the appropriate testing approach for interactive components
5. **ReactFlow Integration**:
   - Currently using basic ReactFlow setup
   - Need to implement custom node types for decision nodes
   - Need to handle node positioning and auto-layout

### User Experience Considerations

1. **Flowchart Clarity**: Ensuring the flowchart remains clear and understandable even with many nodes
2. **Interaction Design**:
   - Creating intuitive interactions for selecting decisions and options
   - Current implementation uses collapsible components for option selection
   - Context menu provides additional actions like deleting nodes
3. **Visual Feedback**:
   - Providing clear visual feedback for user actions
   - Currently using border color changes to indicate selected options
4. **Information Density**: Balancing comprehensive information with visual simplicity

## Important Patterns and Preferences

### Code Style

1. **Component Structure**:
   - Components are organized by feature area (flowchart, sidebar, ui)
   - Component files include both markup and logic
2. **TypeScript Usage**: Strong typing with interfaces defined in dedicated type files
3. **Naming Conventions**: Clear, descriptive names for components and functions
4. **File Organization**: Related files are grouped in dedicated directories

### UI Patterns

1. **Component Composition**: Building complex UIs from smaller, reusable components
2. **Consistent Styling**:
   - Using Tailwind utility classes with consistent patterns
   - Using `cn` utility for combining classnames
3. **Accessibility First**: Ensuring all components are accessible by default
4. **Dark Mode Support**: Supporting both light and dark themes
5. **Collapsible Sections**: Using collapsible components for showing/hiding content
6. **Context Menus**: Providing additional actions through context menus

### State Management

1. **Context Providers**: Using context providers for shared state
2. **Local Component State**:
   - Managing component-specific state locally
   - Using React.useState for component state
3. **Controlled Components**: Using controlled components for form elements
4. **Custom Hooks**: Extracting reusable logic into custom hooks

## Learnings and Project Insights

### Technical Insights

1. **ReactFlow Integration**:
   - Understanding the capabilities and limitations of ReactFlow for interactive flowcharts
   - Need to customize node types for decision representation
   - Need to implement edge logic for prerequisites and consequences
2. **TypeScript Type Definitions**: Importance of clear type definitions for complex data structures
3. **Component Reusability**: Balancing specific functionality with reusable design
4. **State Synchronization**: Need to synchronize local component state with global application state

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
4. **Decision Node Interactions**: Creating intuitive interactions for decision selection
   - Solution: Collapsible interfaces with visual feedback for selected options

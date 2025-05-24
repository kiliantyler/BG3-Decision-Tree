# Project Brief: Baldur's Gate 3 Decision Flowchart

## Project Overview

The BG3-Decision-Tree is an interactive visual tool designed to help players plan their journey through Baldur's Gate 3 by creating a flowchart of game decisions. It allows users to visualize the consequences of their choices and plan their gameplay path.

## Core Requirements

### Functional Requirements

1. **Interactive Flowchart Creation**: Users can create a visual representation of their game decisions

   - React-based UI with ReactFlow for interactive node-based visualization
   - Custom decision nodes with collapsible options
   - Node connection capabilities to show decision relationships

2. **Decision Management**: Users can select outcomes for each decision and see what new options become available

   - Visual feedback for selected options
   - Context menu for additional actions
   - Automatic updates to available decisions based on selections

3. **Act Organization**: Decisions are organized by game acts and locations

   - Clear structure following the game's progression
   - Location-based grouping within each act
   - Hierarchical data organization

4. **Filtering System**: Users can filter decisions by type (required/optional) and availability

   - Sidebar controls for filtering options
   - Search functionality for finding specific decisions
   - Multiple filter criteria (act, location, type)

5. **Search Functionality**: Users can quickly find specific decisions

   - Text-based search across decision descriptions
   - Support for character name searches
   - Results highlighting

6. **Auto-Connection**: Nodes automatically connect to prerequisites when available

   - Visual representation of relationships between decisions
   - Different edge types for different relationship types
   - Intelligent layout to minimize crossing lines

7. **Visual Indicators**: Different visual cues for optional vs. required quests

   - Color coding for decision types
   - Icons for special decision categories
   - Border styles to indicate selection status

8. **Real-time Updates**: Changes to decisions automatically unlock new options

   - Dynamic node addition/removal based on selections
   - Visual feedback for state changes
   - Smooth transitions for better user experience

9. **Developer Mode**: Debug tools accessible via keyboard shortcut (CTRL+SHIFT+D)
   - Performance statistics
   - Data inspection tools
   - Layout debugging helpers

### Technical Requirements

1. **React-based UI**: Modern, component-based architecture

   - React 19 with hooks for state management
   - Component composition for reusable UI elements
   - Context providers for global state management

2. **TypeScript Implementation**: Type-safe code with clear interfaces

   - Strong typing for all data structures
   - Interface definitions for game entities
   - Type guards for runtime safety

3. **Responsive Design**: Works across different screen sizes

   - Mobile-friendly UI adaptations
   - Touch controls for mobile devices
   - Responsive layout components

4. **Performance Optimization**: Efficient rendering of complex flowcharts

   - Virtualization for large node sets
   - Memoization for expensive calculations
   - Optimized re-rendering strategies

5. **State Management**: Effective management of decision states and relationships

   - Context API for global state
   - Local component state for UI interactions
   - Immutable update patterns

6. **Data Structure**: Well-organized data for game decisions and relationships
   - Acts, locations, and regions hierarchy
   - Clear relationship modeling between decisions
   - Extensible structure for future data additions

## Project Goals

1. Create an intuitive tool for BG3 players to plan their gameplay decisions

   - Focus on user experience and visual clarity
   - Minimize learning curve with familiar interaction patterns
   - Provide immediate value even for new users

2. Provide visual clarity on how decisions affect game progression

   - Clear representation of cause-and-effect relationships
   - Visual distinction between different decision types
   - Comprehensive view of decision consequences

3. Help players understand the consequences of their choices

   - Detail immediate and long-term effects
   - Show relationship to companion approval
   - Indicate content that becomes available or unavailable

4. Support different playstyles and character builds

   - Filter options based on character type
   - Highlight decisions relevant to specific builds
   - Show alternative paths for different playstyles

5. Create a maintainable and extensible codebase

   - Clear component architecture
   - Strong typing with TypeScript
   - Comprehensive documentation
   - Testable implementation

6. Deliver a polished user experience with modern web technologies
   - Smooth animations and transitions
   - Responsive design across devices
   - Accessible UI components
   - Dark mode support

## Success Criteria

1. Users can successfully create, visualize, and modify decision flowcharts

   - Complete a flowchart for a specific character build
   - Modify decisions and see consequences update
   - Navigate complex decision trees effectively

2. The application accurately represents game decision relationships

   - Correct prerequisites and unlocks
   - Accurate companion effects
   - Representative of actual game mechanics

3. The interface is intuitive and requires minimal learning curve

   - New users can create basic flowcharts within minutes
   - Clear visual cues guide user actions
   - Tooltips and help text support learning

4. The application performs well even with complex decision trees

   - Smooth interactions with 50+ nodes
   - Quick filtering and search operations
   - Efficient rendering and state updates

5. The codebase is well-structured and maintainable
   - Clear component hierarchy
   - Consistent coding patterns
   - Comprehensive type definitions
   - Modular architecture

## Future Expansion

1. Add persistence with local storage or backend

   - Save multiple flowcharts
   - Resume work on previous sessions
   - User accounts for cloud storage

2. Support for saving/loading multiple flowcharts

   - Named flowcharts for different playthroughs
   - Export/import functionality
   - Versioning support

3. Add more detailed info about consequences

   - Character reaction details
   - Item rewards and acquisitions
   - Experience points and progression impacts

4. Implement decision tooltips for additional information

   - Hover tooltips with extended information
   - Links to related game wiki content
   - User-contributed notes

5. Mobile responsive design

   - Touch-optimized interactions
   - Mobile-specific layouts
   - Gesture controls for flowchart navigation

6. Import/export functionality

   - Share flowcharts with other players
   - Export as images for guides
   - Integration with community platforms

7. Community features
   - Popular path recommendations
   - User ratings for decision paths
   - Comments and discussion on specific decisions

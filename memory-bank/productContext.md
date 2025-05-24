# Product Context: Baldur's Gate 3 Decision Flowchart

## Why This Project Exists

Baldur's Gate 3 is a complex role-playing game with numerous branching storylines, character interactions, and consequential decisions. Players often face challenges in:

1. **Understanding Decision Consequences**: Many choices have far-reaching effects that aren't immediately obvious
2. **Planning Character Journeys**: Players want to plan optimal paths for different character builds and roleplay scenarios
3. **Avoiding Missed Content**: The game has significant content that can be missed based on decisions
4. **Managing Companion Relationships**: Decisions affect companion approval and availability
5. **Tracking Quest Dependencies**: Some quests require specific prerequisites or become unavailable after certain choices

This project exists to address these challenges by providing a visual tool that helps players understand and plan their journey through the game.

## Problems It Solves

1. **Decision Visualization**: Transforms complex text-based decision trees into intuitive visual flowcharts
2. **Consequence Awareness**: Shows the immediate and downstream effects of each decision
3. **Path Planning**: Allows players to map out their intended gameplay path before committing in-game
4. **Content Discovery**: Helps players discover content they might otherwise miss
5. **Companion Management**: Assists in planning which companions to bring for specific quests
6. **Quest Tracking**: Provides a clear view of quest dependencies and mutual exclusivity
7. **Decision Reversibility**: Allows players to experiment with different choices without replaying the game
8. **Progress Tracking**: Helps players keep track of their current position in complex questlines

## How It Should Work

### User Journey

1. **Initial Exploration**: User opens the application and sees the starting decision nodes
2. **Decision Selection**: User selects outcomes for key decisions, which dynamically updates available paths
3. **Path Visualization**: As decisions are made, the flowchart expands to show new options
4. **Optional Content**: User can drag optional quests from the sidebar onto the canvas
5. **Organization**: User can rearrange nodes to create a clear visual representation
6. **Refinement**: User can change decisions to explore alternative paths
7. **Reference**: User refers to the flowchart while playing the game to guide their choices

### Core Functionality

1. **Dynamic Flowchart**: The flowchart updates in real-time as users make decisions
   - ReactFlow provides the technical foundation for this interactivity
   - Custom node types allow for specialized decision representations
   - Edge connections visualize relationships between decisions
2. **Decision Nodes**: Each node represents a key decision point with multiple options
   - Collapsible interface shows/hides available options
   - Visual feedback indicates selected options
   - Context menu provides additional actions
3. **Consequence Visualization**: Visual indicators show the impact of each choice
   - Border colors differentiate selected vs. unselected nodes
   - Future: different node styles for required vs. optional decisions
4. **Prerequisite Linking**: Nodes automatically connect to their prerequisites
   - Edges will represent relationships between decisions
   - Future: different edge styles for different types of relationships
5. **Filtering System**: Users can filter by act, location, or decision type
   - Sidebar will provide filtering options
   - Future: search functionality for finding specific decisions
6. **Search Capability**: Users can search for specific decisions or characters
7. **Optional vs. Required**: Clear distinction between required story decisions and optional content

### Information Architecture

1. **Act Structure**: Content organized by game acts (Act 1, 2, 3)
2. **Location Hierarchy**: Decisions grouped by locations within each act
3. **Decision Types**:
   - Main Quest: Critical path decisions
   - Side Quest: Optional content
   - Companion: Decisions affecting companions
   - Special: Unique or rare decisions
4. **Relationship Types**:
   - Prerequisites: Decisions required before others become available
   - Unlocks: New content made available by decisions
   - Blocks: Content made unavailable by decisions
   - Affects: Decisions that influence but don't determine other content

### Interaction Model

1. **Selection**: Click on decision nodes to interact with them
2. **Expansion**: Collapsible nodes expand to show options
3. **Navigation**: Pan and zoom to explore the flowchart
4. **Drag and Drop**: Add decisions from sidebar to flowchart
5. **Context Actions**: Right-click for additional options
6. **Visual Feedback**: Color changes and animations to indicate state

## User Experience Goals

1. **Intuitive Interface**: Users should understand how to use the tool with minimal instruction
   - Clear visual design
   - Consistent interaction patterns
   - Helpful tooltips and guidance
2. **Visual Clarity**: The flowchart should be easy to read and understand
   - Clear node layout
   - Distinct visual elements
   - Appropriate spacing and organization
3. **Responsive Interaction**: The application should respond quickly to user actions
   - Immediate feedback for selections
   - Smooth animations for state changes
   - Efficient rendering even with large flowcharts
4. **Flexibility**: Users should be able to easily modify their decisions and see updated paths
   - Undo/redo capabilities
   - Easy decision changes
   - Clear consequences of changes
5. **Accessibility**: The tool should be usable by players with different levels of gaming experience
   - Clear labeling
   - Keyboard navigation
   - Screen reader support
6. **Spoiler Management**: Users should be able to control the level of detail shown to avoid unwanted spoilers
   - Progressive disclosure of information
   - Options to hide certain details
7. **Efficiency**: Users should be able to quickly find and make decisions without unnecessary complexity
   - Streamlined workflows
   - Effective search and filtering
   - Logical organization

## Target Audience

1. **New Players**: Those planning their first playthrough who want guidance without spoilers
2. **Experienced Players**: Those planning specific builds or achievement runs
3. **Completionists**: Players who want to ensure they experience all content
4. **Role-players**: Players who want to plan character-consistent decision paths
5. **Content Creators**: Those creating guides or walkthroughs for the game

## Success Metrics

1. **User Engagement**: Time spent using the application
2. **Flowchart Complexity**: Number of decisions mapped in typical user sessions
3. **Feature Utilization**: Usage of filtering, search, and organization features
4. **User Satisfaction**: Feedback on how well the tool helps with game planning
5. **Community Adoption**: Sharing and discussion of the tool in BG3 communities
6. **Decision Coverage**: Percentage of game decisions represented in the tool
7. **Technical Performance**: Rendering and interaction speeds with large flowcharts

## Current Development Focus

The current development focuses on building the core flowchart functionality:

1. **Decision Node Implementation**: Creating interactive decision nodes with option selection
2. **Flowchart Foundation**: Establishing the ReactFlow integration for visualization
3. **Data Structure**: Defining the TypeScript interfaces for game data
4. **UI Components**: Building reusable components for the interface
5. **State Management**: Developing the approach for tracking decision states

## Future Enhancements

1. **Local Storage**: Saving flowcharts between sessions
2. **Import/Export**: Sharing flowcharts with others
3. **Detailed Consequences**: More in-depth information about decision outcomes
4. **Character Stats**: Filtering decisions based on character builds
5. **Mobile Optimization**: Better experience on smaller screens
6. **Community Features**: Voting on best paths, commenting on decisions
7. **Companion Focus**: Views centered around maximizing specific companion relationships

# Baldur's Gate 3 Decision Flowchart

An interactive visual tool for planning your journey through Baldur's Gate 3 by creating a flowchart of game decisions.

![BG3 Decision Flowchart Screenshot](https://i.imgur.com/placeholder.png)

## Features

- **Interactive Flowchart**: Drag and drop decision nodes onto a canvas to create your own flowchart
- **Decision Management**: Select outcomes for each decision and see what new options become available
- **Act Organization**: Decisions are organized by game acts and locations
- **Filtering**: Filter decisions by type (required/optional) and availability
- **Search**: Quickly find specific decisions
- **Auto-Connection**: Nodes automatically connect to prerequisites when available
- **Visual Indicators**: Different colors for optional vs. required quests
- **Real-time Updates**: Changes to decisions automatically unlock new options
- **Developer Mode**: Press CTRL+SHIFT+D to access debug tools (in development environment)

## Technologies Used

- **React**: UI framework
- **Vite**: Fast bundler and dev server
- **React Flow**: Flowchart visualization library
- **Vercel Analytics**: Performance tracking

## Getting Started

### Prerequisites

- Node.js 22.15.0+ installed
- One of the following package managers:
  - npm 10.0.0+
  - yarn 3.0.0+
  - pnpm 8.0.0+
  - bun 1.0.0+

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kiliantyler/BG3-Decision-Tree.git
   cd BG3-Decision-Tree
   ```

2. Install dependencies using your preferred package manager:

   **Using npm:**

   ```bash
   npm install
   # or use the script
   npm run npm:install
   ```

   **Using yarn:**

   ```bash
   yarn install
   # or use the script
   npm run yarn:install
   ```

   **Using pnpm:**

   ```bash
   pnpm install
   # or use the script
   npm run pnpm:install
   ```

   **Using bun:**

   ```bash
   bun install
   # or use the script
   npm run bun:install
   ```

3. Start the development server:

   **Using npm:**

   ```bash
   npm run dev
   # or use the script
   npm run npm:dev
   ```

   **Using yarn:**

   ```bash
   yarn dev
   # or use the script
   npm run yarn:dev
   ```

   **Using pnpm:**

   ```bash
   pnpm dev
   # or use the script
   npm run pnpm:dev
   ```

   **Using bun:**

   ```bash
   bun dev
   # or use the script
   npm run bun:dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Other Commands

**Build the project:**

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using pnpm
pnpm build

# Using bun
bun build
```

**Preview the production build:**

```bash
# Using npm
npm run preview

# Using yarn
yarn preview

# Using pnpm
pnpm preview

# Using bun
bun preview
```

**Run linting:**

```bash
# Using npm
npm run lint

# Using yarn
yarn lint

# Using pnpm
pnpm lint

# Using bun
bun lint
```

## Usage

1. **Add Starting Decisions**: The initial quest node will appear on the canvas automatically
2. **Select Outcomes**: Click on a decision node and select one of the available options
3. **See New Decisions Appear**: After making a choice, new decisions will be unlocked and appear below
4. **Drag from Sidebar**: Drag optional decisions from the sidebar onto the canvas
5. **Rearrange Nodes**: Click and drag nodes to organize your flowchart
6. **Remove Nodes**: Click the X on a node to remove it (and its dependents)
7. **Change Decisions**: You can change your selected option, but this will remove dependent nodes
8. **Debug Mode**: Press CTRL+SHIFT+D to activate developer tools for debugging (development only)

### Debug Mode

When in development, you can press CTRL+SHIFT+D to access powerful debugging tools:

- **Tree Stats**: View statistics about your decision tree
- **Decisions**: Browse all decisions in the database, search, and add to canvas
- **Canvas Data**: Examine all nodes and edges currently on the canvas

Press CTRL+SHIFT+D again to deactivate debug mode.

## Data Structure

The application uses a structured data format for game decisions:

```javascript
{
  id: "unique_decision_id",
  type: "decision",
  category: "Act 1 - Location",
  label: "Decision Name",
  description: "Detailed description...",
  options: ["Option 1", "Option 2", "Option 3"],
  prerequisites: ["prerequisite_id"],
  unlocks: ["unlocked_id_1", "unlocked_id_2"],
  mutuallyExclusive: [],
  optional: false,
  required: true,
  location: "Specific location",
  characters: ["Character 1", "Character 2"]
}
```

## Project Structure

```markdown
src/
├── components/ # React components
│ ├── DecisionNode.jsx # Node component for decisions
│ ├── FlowChart.jsx # Main flowchart component
│ ├── OutcomeNode.jsx # Node for outcome display
│ ├── Sidebar.jsx # Sidebar with available decisions
│ └── DebugPanel.jsx # Debug panel (dev mode only)
├── contexts/ # React contexts
│ └── DecisionContext.jsx # Decision management context
├── data/ # Game data
│ ├── decisions/ # Decision data organized by act
│ ├── enhancedDataManager.js # Data management with HMR support
│ └── gameDecisionTypes.js # Type definitions
├── hooks/ # Custom React hooks
│ ├── useDecisionManager.jsx # Decision state management
│ └── useNodeLayoutManager.jsx # Node layout utilities
├── styles/ # CSS styles
│ └── customStyles.css # Custom styling for the app
└── App.jsx # Main application component
```

## Future Plans

1. Add persistence with local storage or backend
2. Support for saving/loading multiple flowcharts
3. Add more detailed info about consequences
4. Implement decision tooltips for additional information
5. ~~Dark mode support~~
6. Mobile responsive design
7. Import/export functionality

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The Baldur's Gate 3 community for documenting game decisions
- Larian Studios for creating such an amazing game
- React Flow for the excellent flowchart library

## Disclaimer

This project is a fan-made tool and is not affiliated with or endorsed by Larian Studios or the Baldur's Gate franchise. All game content, characters, and references belong to their respective owners.

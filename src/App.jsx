// src/App.jsx
import { Analytics } from '@vercel/analytics/react';
import React, { useEffect, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import './styles/customStyles.css';

// Components
import FlowChart from './components/FlowChart.jsx';
import Sidebar from './components/Sidebar.jsx';

// Context
import { DecisionProvider, useDecision } from './contexts/DecisionContext.jsx';

// Data
import { getStartingNode } from './data/index';

// Inner App component that uses the decision context
const AppContent = () => {
  // Use the decision context
  const {
    nodes,
    edges,
    completedDecisions,
    categorizedDecisions,
    addNodeFromSidebar,
    handleRemoveNode,
    newlyAddedNodes,
  } = useDecision();

  // Reference to track if initial node has been added
  const initialNodeAdded = useRef(false);

  // Initialize with starting node
  useEffect(() => {
    console.log(
      'App useEffect running, nodes length:',
      nodes?.length || 0,
      'initialNodeAdded:',
      initialNodeAdded.current
    );

    // Only add starting node if we don't have any nodes yet
    // and we haven't already added the initial node
    // Guard against undefined nodes with optional chaining
    if ((nodes?.length || 0) === 0 && !initialNodeAdded.current) {
      console.log('Adding starting node');
      const startingNode = getStartingNode();
      if (startingNode) {
        console.log('Starting node found:', startingNode);
        // Add starting node to canvas with initial position
        const initialPosition = { x: 50, y: 50 };

        const result = addNodeFromSidebar(
          {
            ...startingNode,
          },
          initialPosition
        );

        // Mark that we've added the initial node
        if (result) {
          console.log('Starting node added successfully');
          initialNodeAdded.current = true;
        }
      } else {
        console.log('No starting node found');
      }
    }
  }, [nodes, addNodeFromSidebar]);

  // Handle node drop from sidebar
  const handleNodeDrop = (decisionData, position) => {
    console.log('Handling node drop:', decisionData.id, position);
    return addNodeFromSidebar(decisionData, position);
  };

  return (
    <div className="app-container">
      <Sidebar
        decisions={categorizedDecisions || {}}
        availableOnly={true}
        completed={completedDecisions || []}
      />

      <FlowChart
        initialNodes={nodes || []}
        initialEdges={edges || []}
        onNodeDrop={handleNodeDrop}
        onNodeRemove={handleRemoveNode}
        newlyAddedNodes={newlyAddedNodes || []}
      />
      <Analytics />
    </div>
  );
};

// Main App component that provides context
const App = () => {
  return (
    <ReactFlowProvider>
      <DecisionProvider>
        <AppContent />
      </DecisionProvider>
    </ReactFlowProvider>
  );
};

export default App;

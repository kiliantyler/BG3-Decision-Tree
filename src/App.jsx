// src/App.jsx
import { Analytics } from '@vercel/analytics/react';
import React, { useEffect, useRef, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import './styles/customStyles.css';
import './styles/theme.css';

// Components
import DebugPanel from './components/DebugPanel.jsx';
import FlowChart from './components/FlowChart.jsx';
import Sidebar from './components/Sidebar.jsx';

// Context
import { DecisionProvider, useDecision } from './contexts/DecisionContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

// Import from enhanced data manager
import { getStartingNode } from './data/enhancedDataManager.js';

// Inner App component that uses the decision context
const AppContent = () => {
  // Use the decision context
  const {
    nodes,
    edges,
    setNodes,
    completedDecisions,
    categorizedDecisions,
    addNodeFromSidebar,
    handleRemoveNode,
    newlyAddedNodes,
    resetState,
  } = useDecision();

  // Reference to track if initial node has been added
  const initialNodeAdded = useRef(false);

  // State for app status
  const [status, setStatus] = useState({ loading: true, error: null });

  // Log the state of the app
  useEffect(() => {
    console.log('App Status:', {
      nodesCount: nodes?.length || 0,
      edgesCount: edges?.length || 0,
      completedCount: completedDecisions?.length || 0,
      categoriesCount: Object.keys(categorizedDecisions || {}).length,
      initialNodeAdded: initialNodeAdded.current,
    });
  }, [nodes, edges, completedDecisions, categorizedDecisions]);

  // Initialize with starting node
  useEffect(() => {
    if (status.loading) {
      try {
        console.log('App initializing...');

        // Only add starting node if we don't have any nodes yet
        // and we haven't already added the initial node
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
            console.warn('No starting node found');
            setStatus({ loading: false, error: "Couldn't find starting node" });
            return;
          }
        }

        // Update status
        setStatus({ loading: false, error: null });
      } catch (err) {
        console.error('Error initializing app:', err);
        setStatus({ loading: false, error: err.message });
      }
    }
  }, [nodes, addNodeFromSidebar, status.loading]);

  // Handle node drop from sidebar
  const handleNodeDrop = (decisionData, position) => {
    console.log('Handling node drop:', decisionData.id, position);
    return addNodeFromSidebar(decisionData, position);
  };

  // Show loading state
  if (status.loading) {
    return (
      <div
        className="loading-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.5rem',
          color: '#666',
        }}
      >
        Loading Baldur's Gate 3 decision tree...
      </div>
    );
  }

  // Show error state
  if (status.error) {
    return (
      <div
        className="error-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: '#d32f2f',
        }}
      >
        <h3>Error loading data</h3>
        <p>{status.error}</p>
        <button
          onClick={() => setStatus({ loading: true, error: null })}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Handle reset button click
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetState();
      // Force reload the page to ensure a clean state
      window.location.reload();
    }
  };

  // Render the main application
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
        setNodes={setNodes} // Pass the setNodes function to update node positions
        onReset={handleReset} // Pass the reset function to FlowChart
      />

      {/* Debug panel - activated with CTRL+SHIFT+D */}
      <DebugPanel />

      {/* Hidden debug info - appears in bottom right corner on hover */}
      <div
        style={{
          position: 'fixed',
          bottom: '5px',
          right: '5px',
          fontSize: '10px',
          color: '#999',
          padding: '2px 5px',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '2px',
          opacity: 0.3,
          transition: 'opacity 0.3s ease',
          cursor: 'help',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.3')}
      >
        Press CTRL+SHIFT+D for debug mode
      </div>

      <Analytics />
    </div>
  );
};

// Main App component that provides context
const App = () => {
  return (
    <ReactFlowProvider>
      <ThemeProvider>
        <DecisionProvider>
          <AppContent />
        </DecisionProvider>
      </ThemeProvider>
    </ReactFlowProvider>
  );
};

export default App;

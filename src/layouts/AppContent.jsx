// components/layout/AppContent.jsx
import { Analytics } from '@vercel/analytics/react'
import React, { useEffect, useRef, useState } from 'react'

// Components
import { DebugPanel } from '../debug'
import { FlowChart } from '../flowchart'
import { Sidebar } from '../sidebar'

// Context
import { useDecision } from '../contexts/DecisionContext'

// Import from enhanced data manager
import { getStartingNode } from '../data/enhancedDataManager'

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
  } = useDecision()

  // Reference to track if initial node has been added
  const initialNodeAdded = useRef(false)

  // State for app status
  const [status, setStatus] = useState({ loading: true, error: null })

  // Log the state of the app
  useEffect(() => {
    console.log('App Status:', {
      nodesCount: nodes?.length || 0,
      edgesCount: edges?.length || 0,
      completedCount: completedDecisions?.length || 0,
      categoriesCount: Object.keys(categorizedDecisions || {}).length,
      initialNodeAdded: initialNodeAdded.current,
    })
  }, [nodes, edges, completedDecisions, categorizedDecisions])

  // Initialize with starting node
  useEffect(() => {
    if (status.loading) {
      try {
        console.log('App initializing...')

        // Only add starting node if we don't have any nodes yet
        // and we haven't already added the initial node
        if ((nodes?.length || 0) === 0 && !initialNodeAdded.current) {
          console.log('Adding starting node')
          const startingNode = getStartingNode()

          if (startingNode) {
            console.log('Starting node found:', startingNode)
            // Add starting node to canvas with initial position
            const initialPosition = { x: 50, y: 50 }

            const result = addNodeFromSidebar(
              {
                ...startingNode,
              },
              initialPosition
            )

            // Mark that we've added the initial node
            if (result) {
              console.log('Starting node added successfully')
              initialNodeAdded.current = true
            }
          } else {
            console.warn('No starting node found')
            setStatus({ loading: false, error: "Couldn't find starting node" })
            return
          }
        }

        // Update status
        setStatus({ loading: false, error: null })
      } catch (err) {
        console.error('Error initializing app:', err)
        setStatus({ loading: false, error: err.message })
      }
    }
  }, [nodes, addNodeFromSidebar, status.loading])

  // Handle node drop from sidebar
  const handleNodeDrop = (decisionData, position) => {
    console.log('Handling node drop:', decisionData.id, position)
    return addNodeFromSidebar(decisionData, position)
  }

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
    )
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
    )
  }

  // Handle reset button click
  const handleReset = () => {
    resetState()
    // Force reload the page to ensure a clean state
    window.location.reload()
  }

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

      {/* Debug panel is toggled with CTRL+SHIFT+D */}

      <Analytics />
    </div>
  )
}

export { AppContent }

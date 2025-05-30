// components/flowchart/FlowChart.jsx
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MarkerType,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node components
import DecisionNode from './DecisionNode';
import OutcomeNode from './OutcomeNode';

// UI components
import { FitViewButton, ResetButton, ThemeToggle } from '../ui';

// Custom hooks
import useNodeLayoutManager from '../../hooks/useNodeLayoutManager';

// Define node types for the flow chart
const nodeTypes = {
  decision: DecisionNode,
  outcome: OutcomeNode,
};

const FlowChart = ({
  initialNodes = [],
  initialEdges = [],
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeDrop,
  newlyAddedNodes = [],
  setNodes: setParentNodes, // Add this prop to update parent nodes state
  onReset, // Add reset function prop
}) => {
  // ReactFlow states
  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Use the layout manager hook
  const layoutManager = useNodeLayoutManager(reactFlowInstance);

  // Debug logging
  useEffect(() => {
    console.log('FlowChart received initialNodes:', initialNodes.length);
  }, [initialNodes.length]);

  // Update nodes and edges when props change
  useEffect(() => {
    console.log('Updating nodes in FlowChart to:', initialNodes.length);
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  // Focus on newly added nodes from props
  useEffect(() => {
    if (newlyAddedNodes.length > 0 && reactFlowInstance) {
      console.log(
        'Focusing on newly added nodes:',
        newlyAddedNodes.map(n => n.id)
      );
      layoutManager.focusOnNewNodes(newlyAddedNodes);
    }
  }, [newlyAddedNodes, reactFlowInstance, layoutManager]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  // Forward node changes to parent if needed
  const handleNodesChange = useCallback(
    changes => {
      onNodesChangeInternal(changes);

      // Update parent nodes state with current positions
      if (setParentNodes && reactFlowInstance) {
        // Get the current nodes with updated positions
        const currentNodes = reactFlowInstance.getNodes();

        // Only update parent state after position changes (not during other operations)
        const positionChanges = changes.filter(
          change => change.type === 'position' && change.dragging === false
        );

        if (positionChanges.length > 0) {
          // Update the parent nodes state with the current positions
          setParentNodes(currentNodes);
        }
      }

      // Call the original onNodesChange if provided
      if (onNodesChange) {
        onNodesChange(changes);
      }
    },
    [onNodesChangeInternal, onNodesChange, setParentNodes, reactFlowInstance]
  );

  // Forward edge changes to parent if needed
  const handleEdgesChange = useCallback(
    changes => {
      onEdgesChangeInternal(changes);
      if (onEdgesChange) {
        onEdgesChange(changes);
      }
    },
    [onEdgesChangeInternal, onEdgesChange]
  );

  // Handle connections between nodes
  const handleConnect = useCallback(
    params => {
      // Create connection with arrow marker
      const connection = {
        ...params,
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      // Update internal edges
      setEdges(eds => addEdge(connection, eds));

      // Notify parent
      if (onConnect) {
        onConnect(connection);
      }
    },
    [setEdges, onConnect]
  );

  // Handle dropping new nodes onto the canvas
  const handleDrop = useCallback(
    event => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const reactFlowBounds = event.target.getBoundingClientRect();
      const nodeType = event.dataTransfer.getData('application/reactflow');
      const decisionDataStr = event.dataTransfer.getData('decision');

      // Check if the dropped element is valid
      if (typeof nodeType === 'undefined' || !nodeType || !decisionDataStr) {
        return;
      }

      // Parse the decision data
      let decisionData;
      try {
        decisionData = JSON.parse(decisionDataStr);
      } catch (e) {
        console.error('Failed to parse decision data', e);
        return;
      }

      // Calculate position of the new node
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Notify parent about the new node
      if (onNodeDrop) {
        console.log('Dropping node:', decisionData.id, 'at position:', position);
        return onNodeDrop(decisionData, position);
      }
    },
    [reactFlowInstance, onNodeDrop]
  );

  // Allow dropping on the pane
  const handleDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Initialize ReactFlow instance
  const handleInit = useCallback(instance => {
    console.log('ReactFlow instance initialized');
    setReactFlowInstance(instance);

    // Initial fit view after a short delay to ensure all nodes are rendered
    setTimeout(() => {
      instance.fitView({ padding: 0.3 });
    }, 200);

    // Add scroll indicator functionality
    setTimeout(() => {
      // Create scroll indicator element if it doesn't exist
      let scrollIndicator = document.querySelector('.scroll-indicator');
      if (!scrollIndicator) {
        scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '▼';
        document.body.appendChild(scrollIndicator);
      }

      const categoriesEl = document.querySelector('.decision-categories');
      if (categoriesEl) {
        // Check if scrollable on load
        checkIfScrollable(categoriesEl, scrollIndicator);

        // Add scroll event listener
        categoriesEl.addEventListener('scroll', () => {
          checkIfScrollable(categoriesEl, scrollIndicator);
        });

        // Add resize observer to check when content changes
        const resizeObserver = new ResizeObserver(() => {
          checkIfScrollable(categoriesEl, scrollIndicator);
        });
        resizeObserver.observe(categoriesEl);

        // Also check when showUnavailable changes
        document.getElementById('cb-available').addEventListener('change', () => {
          // Wait a moment for the DOM to update
          setTimeout(() => {
            checkIfScrollable(categoriesEl, scrollIndicator);
          }, 100);
        });
      }
    }, 500);
  }, []);

  // Function to check if content is scrollable and show/hide indicator
  const checkIfScrollable = (element, indicator) => {
    console.log('Checking if scrollable:', element.scrollHeight, element.clientHeight);
    if (element.scrollHeight > element.clientHeight) {
      indicator.classList.add('visible');
    } else {
      indicator.classList.remove('visible');
    }
  };

  // Function to fit all nodes in the view
  const handleFitView = useCallback(() => {
    if (reactFlowInstance) {
      // Get the container element to calculate proper dimensions
      const container = document.querySelector('.reactflow-wrapper');
      if (!container) {
        console.warn('Could not find ReactFlow container');
        return;
      }

      // First, fit all nodes
      reactFlowInstance.fitView({
        padding: 0.3,
        includeHiddenNodes: false,
        minZoom: 0.2,
        maxZoom: 1.5,
      });

      // After fitting, adjust the viewport if needed
      setTimeout(() => {
        const { y, zoom } = reactFlowInstance.getViewport();

        // Get the dimensions of the container
        const containerWidth = container.clientWidth;

        // Calculate the center point of the visible area
        const effectiveCenterX = containerWidth / 2;

        // Get all nodes to calculate their center
        const nodes = reactFlowInstance.getNodes();
        if (nodes.length === 0) return;

        // Calculate the center of all nodes
        const positions = nodes.map(node => node.position);
        const nodesCenterX = positions.reduce((sum, pos) => sum + pos.x, 0) / positions.length;

        // Adjust viewport to center nodes properly
        reactFlowInstance.setViewport(
          {
            x: -nodesCenterX * zoom + effectiveCenterX,
            y,
            zoom,
          },
          { duration: 200 }
        );
      }, 50);
    }
  }, [reactFlowInstance]);

  return (
    <div className="reactflow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onInit={handleInit}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        nodeTypes={nodeTypes}
        fitView={false} // Changed to false since we're manually handling zoom
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="hidden"
      >
        <Controls position="bottom-right" />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      {/* Theme toggle button */}
      <ThemeToggle />

      {/* Custom fit view button (positioned next to theme toggle) */}
      <FitViewButton onClick={handleFitView} />

      {/* Reset button */}
      {onReset && <ResetButton onClick={onReset} />}
    </div>
  );
};

export default FlowChart;

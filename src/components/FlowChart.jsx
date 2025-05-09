// src/components/FlowChart.jsx
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
import DecisionNode from './DecisionNode.jsx';
import OutcomeNode from './OutcomeNode.jsx';

// Custom hooks
import useNodeLayoutManager from '../hooks/useNodeLayoutManager.jsx';

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
  onNodeRemove,
  onNodeAdd,
  onNodeDrop,
}) => {
  // ReactFlow states
  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Previous nodes count to detect new nodes
  const [prevNodesLength, setPrevNodesLength] = useState(initialNodes.length);

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

    // If nodes have increased, fit view to show all nodes
    if (initialNodes.length > prevNodesLength && reactFlowInstance) {
      console.log('Nodes increased, fitting view');
      setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.3 });
      }, 200);
    }

    setPrevNodesLength(initialNodes.length);
  }, [initialNodes, setNodes, reactFlowInstance, prevNodesLength]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  // Forward node changes to parent if needed
  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChangeInternal(changes);
      if (onNodesChange) {
        onNodesChange(changes);
      }
    },
    [onNodesChangeInternal, onNodesChange]
  );

  // Forward edge changes to parent if needed
  const handleEdgesChange = useCallback(
    (changes) => {
      onEdgesChangeInternal(changes);
      if (onEdgesChange) {
        onEdgesChange(changes);
      }
    },
    [onEdgesChangeInternal, onEdgesChange]
  );

  // Handle connections between nodes
  const handleConnect = useCallback(
    (params) => {
      // Create connection with arrow marker
      const connection = {
        ...params,
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      // Update internal edges
      setEdges((eds) => addEdge(connection, eds));

      // Notify parent
      if (onConnect) {
        onConnect(connection);
      }
    },
    [setEdges, onConnect]
  );

  // Handle dropping new nodes onto the canvas
  const handleDrop = useCallback(
    (event) => {
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
        console.log(
          'Dropping node:',
          decisionData.id,
          'at position:',
          position
        );
        onNodeDrop(decisionData, position);
      }
    },
    [reactFlowInstance, onNodeDrop]
  );

  // Allow dropping on the pane
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Initialize ReactFlow instance
  const handleInit = useCallback((instance) => {
    console.log('ReactFlow instance initialized');
    setReactFlowInstance(instance);

    // Initial fit view after a short delay to ensure all nodes are rendered
    setTimeout(() => {
      instance.fitView({ padding: 0.3 });
    }, 200);
  }, []);

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
        fitView
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="hidden"
      >
        <Controls position="bottom-right" />
        <Background variant="dots" gap={12} size={1} color="#ddd" />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;

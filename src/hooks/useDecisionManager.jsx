// src/hooks/useDecisionManager.jsx - Updated to ensure all decisions are available to the sidebar
import { useCallback, useEffect, useState } from 'react';
import { MarkerType } from 'reactflow';
// Import all decisions from the data manager
import {
  allDecisions,
  decisionsByCategory,
  getAvailableDecisions,
  getUnlockedDecisions,
} from '../data/enhancedDataManager';

// Debug flag
const DEBUG = true; // Enable debugging

// Local storage key
const STORAGE_KEY = 'bg3-decision-tree-state';

/**
 * Custom hook for managing decisions, nodes, and edges in the flowchart
 */
const useDecisionManager = () => {
  // State for tracking completed decisions
  const [completedDecisions, setCompletedDecisions] = useState([]);

  // State for tracking available decisions (for the sidebar)
  const [availableDecisions, setAvailableDecisions] = useState([]);

  // State for categorized decisions (for the sidebar)
  // Initialize with ALL decisions organized by category, not just available ones
  const [categorizedDecisions, setCategorizedDecisions] = useState(decisionsByCategory || {});

  // State for nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Track the last decision that was completed
  const [lastCompletedDecision, setLastCompletedDecision] = useState(null);

  // Track newly added nodes to enable focusing on them
  const [newlyAddedNodes, setNewlyAddedNodes] = useState([]);

  // Load state from localStorage on initialization
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);

      if (savedState) {
        const {
          completedDecisions: savedCompletedDecisions,
          nodes: savedNodes,
          edges: savedEdges,
        } = JSON.parse(savedState);

        if (DEBUG) {
          console.log('🔧 useDecisionManager: Loading state from localStorage', {
            completedDecisions: savedCompletedDecisions?.length || 0,
            nodes: savedNodes?.length || 0,
            edges: savedEdges?.length || 0,
          });
        }

        // Restore state from localStorage
        if (savedCompletedDecisions) setCompletedDecisions(savedCompletedDecisions);
        if (savedNodes) {
          // Ensure node data has the necessary functions
          const restoredNodes = savedNodes.map(node => ({
            ...node,
            data: {
              ...node.data,
              onComplete: handleDecisionComplete,
              onRemove: handleRemoveNode,
            },
          }));
          setNodes(restoredNodes);
        }
        if (savedEdges) setEdges(savedEdges);
      } else {
        if (DEBUG) {
          console.log('🔧 useDecisionManager: No saved state found in localStorage');
        }
      }
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
    }

    if (DEBUG) {
      console.log('🔧 useDecisionManager: Initializing with raw data', {
        allDecisionsCount: allDecisions?.length || 0,
        categoriesCount: Object.keys(decisionsByCategory || {}).length,
        categoryNames: Object.keys(decisionsByCategory || {}),
      });

      // Verify data structure
      const allCategorizedDecisions = Object.values(decisionsByCategory || {}).flat();
      console.log('🔧 useDecisionManager: Data verification', {
        allDecisionsHasCorrectLength: allDecisions?.length === allCategorizedDecisions.length,
        allDecisionsLength: allDecisions?.length || 0,
        categorizedDecisionsLength: allCategorizedDecisions.length,
      });
    }

    // Initialize states
    setCategorizedDecisions(decisionsByCategory || {});
    setAvailableDecisions(getAvailableDecisions(completedDecisions));
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      // Only save if we have some state to save
      if (completedDecisions.length > 0 || nodes.length > 0 || edges.length > 0) {
        // Create a simplified version of nodes without circular references
        const nodesToSave = nodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            // Remove function references that can't be serialized
            onComplete: undefined,
            onRemove: undefined,
          },
        }));

        const stateToSave = {
          completedDecisions,
          nodes: nodesToSave,
          edges,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));

        if (DEBUG) {
          console.log('🔧 useDecisionManager: Saved state to localStorage', {
            completedDecisions: completedDecisions.length,
            nodes: nodes.length,
            edges: edges.length,
          });
        }
      }
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }, [completedDecisions, nodes, edges]);

  // Find all nodes that depend on a given node (recursively)
  const findDependentNodes = useCallback(
    nodeId => {
      const directDependents = edges
        .filter(edge => edge.source === nodeId)
        .map(edge => edge.target);

      let allDependents = [...directDependents];

      // Recursively find dependents of dependents
      directDependents.forEach(depId => {
        const subDependents = findDependentNodesInternal(depId);
        allDependents = [...allDependents, ...subDependents];
      });

      return allDependents;
    },
    [edges]
  );

  // Internal version to avoid recursion issues
  const findDependentNodesInternal = nodeId => {
    const directDependents = edges.filter(edge => edge.source === nodeId).map(edge => edge.target);

    let allDependents = [...directDependents];

    // Recursively find dependents of dependents, but limit depth to avoid infinite loops
    directDependents.forEach(depId => {
      // Avoid circular references by checking if we've already seen this node
      if (!allDependents.includes(depId)) {
        const childDeps = edges.filter(edge => edge.source === depId).map(edge => edge.target);
        allDependents = [...allDependents, ...childDeps];
      }
    });

    return allDependents;
  };

  // We'll use the layout manager's calculateNodePosition function instead

  // Handle removing a node from the canvas
  const handleRemoveNode = useCallback(
    nodeId => {
      // First check if this node has dependent nodes
      const dependentNodes = findDependentNodes(nodeId);

      if (dependentNodes.length > 0) {
        // Show warning if there are nodes that depend on this one
        if (
          !window.confirm(
            `Removing this node will also remove ${dependentNodes.length} dependent node(s). Continue?`
          )
        ) {
          return; // User cancelled
        }

        // Remove this node and all its dependents
        const allNodesToRemove = [nodeId, ...dependentNodes];
        setNodes(nds => nds.filter(node => !allNodesToRemove.includes(node.id)));
        setEdges(eds =>
          eds.filter(
            edge =>
              !allNodesToRemove.includes(edge.source) && !allNodesToRemove.includes(edge.target)
          )
        );

        // Also remove from completedDecisions
        setCompletedDecisions(prev => prev.filter(id => !allNodesToRemove.includes(id)));
      } else {
        // Just remove this node
        setNodes(nds => nds.filter(node => node.id !== nodeId));
        setEdges(eds => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));

        // Also remove from completedDecisions if present
        setCompletedDecisions(prev => prev.filter(id => id !== nodeId));
      }
    },
    [findDependentNodes, setNodes, setEdges, setCompletedDecisions]
  );

  // Function to add unlocked nodes to canvas with proper connections
  const addUnlockedNodesToCanvas = useCallback(
    (sourceDecisionId, unlockedDecisions) => {
      // Find the source node
      const sourceNode = nodes.find(node => node.id === sourceDecisionId);
      if (!sourceNode) return null;

      // Filter to only required decisions (not optional ones)
      const requiredDecisions = unlockedDecisions.filter(
        decision => decision.required === true && !decision.optional
      );

      // Skip if no required decisions
      if (requiredDecisions.length === 0) {
        return null;
      }

      // Create new nodes and edges
      const newNodes = [];
      const newEdges = [];
      const newNodeIds = [];

      // Import layout constants from useNodeLayoutManager
      const VERTICAL_SPACING = 300;
      const HORIZONTAL_SPACING = 250;

      // Calculate position for a node based on parent and siblings
      const calculateNodePosition = (parentNode, index, totalSiblings) => {
        if (!parentNode) {
          return { x: 50, y: 50 };
        }

        // Get parent position
        const parentX = parentNode.position.x;
        const parentY = parentNode.position.y;

        // Calculate horizontal offset for multiple children
        let horizontalOffset = 0;
        if (totalSiblings > 1) {
          // Calculate total width of all siblings
          const totalWidth = (totalSiblings - 1) * HORIZONTAL_SPACING;
          // Calculate starting offset to center the group
          horizontalOffset = -totalWidth / 2 + index * HORIZONTAL_SPACING;
        }

        // Place node below parent, with horizontal offset if there are siblings
        return {
          x: parentX + horizontalOffset,
          y: parentY + VERTICAL_SPACING,
        };
      };

      // Calculate positions for new nodes
      requiredDecisions.forEach((decision, index) => {
        // Skip if node already exists on canvas
        if (nodes.some(node => node.id === decision.id)) {
          return;
        }

        // Calculate position
        const position = calculateNodePosition(sourceNode, index, requiredDecisions.length);

        // Create new node
        const newNode = {
          id: decision.id,
          type: decision.type || 'decision',
          position,
          data: {
            ...decision,
            onComplete: handleDecisionComplete,
            onRemove: handleRemoveNode,
          },
        };

        // Add node to list
        newNodes.push(newNode);
        newNodeIds.push(decision.id);

        // Create connection from source to this node
        const newEdge = {
          id: `e-${sourceDecisionId}-${decision.id}`,
          source: sourceDecisionId,
          target: decision.id,
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };

        // Add edge to list
        newEdges.push(newEdge);
      });

      // Update nodes and edges state if we have new nodes
      if (newNodes.length > 0) {
        setNodes(nds => {
          const updatedNodes = [...nds, ...newNodes];
          // Set newly added nodes to enable focusing in FlowChart
          setNewlyAddedNodes(newNodes);
          return updatedNodes;
        });
        setEdges(eds => [...eds, ...newEdges]);
        return {
          newNodeIds,
          sourceNodeId: sourceDecisionId,
          addedNodes: newNodes,
        };
      }

      return null;
    },
    [nodes]
  );

  // Add a new node when dragged from sidebar
  const addNodeFromSidebar = useCallback(
    (decisionData, position) => {
      // Check if node already exists
      if (nodes.some(node => node.id === decisionData.id)) {
        return null;
      }

      // Create a new node
      const newNode = {
        id: decisionData.id,
        type: decisionData.type || 'decision',
        position,
        data: {
          ...decisionData,
          onComplete: handleDecisionComplete,
          onRemove: handleRemoveNode,
        },
      };

      // Add the new node to the chart
      setNodes(nds => {
        const updatedNodes = [...nds, newNode];
        // Set newly added nodes to enable focusing in FlowChart
        setNewlyAddedNodes([newNode]);
        return updatedNodes;
      });

      // If this node has prerequisites, automatically create connections
      if (decisionData.prerequisites && decisionData.prerequisites.length > 0) {
        const newEdges = [];

        // For each prerequisite, check if it's on the canvas
        decisionData.prerequisites.forEach(prereqId => {
          const sourceNode = nodes.find(node => node.id === prereqId);
          if (sourceNode) {
            // Create a connection from the prerequisite to this node
            const newEdge = {
              id: `e-${prereqId}-${decisionData.id}`,
              source: prereqId,
              target: decisionData.id,
              animated: true,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            };

            // Add edge
            newEdges.push(newEdge);
          }
        });

        // Add all new edges
        if (newEdges.length > 0) {
          setEdges(eds => [...eds, ...newEdges]);
        }
      }

      return { id: decisionData.id, node: newNode };
    },
    [nodes, handleRemoveNode]
  );

  // Handle when a decision is completed or changed
  const handleDecisionComplete = useCallback(
    (decisionId, option, isChanging = false) => {
      console.log(
        `Decision ${decisionId} ${isChanging ? 'changed to' : 'completed with'} option: ${option}`
      );

      // If changing a decision, we need to remove any nodes that depend on this one
      if (isChanging) {
        // First, find all nodes that depend on this one (recursively)
        const nodesToRemove = findDependentNodes(decisionId);

        // Remove all these nodes
        if (nodesToRemove.length > 0) {
          // Show warning if there are many nodes to be removed
          if (
            nodesToRemove.length > 2 &&
            !window.confirm(
              `Changing this decision will remove ${nodesToRemove.length} dependent nodes. Continue?`
            )
          ) {
            return; // User cancelled
          }

          setNodes(nds => nds.filter(node => !nodesToRemove.includes(node.id)));
          setEdges(eds =>
            eds.filter(
              edge => !nodesToRemove.includes(edge.source) && !nodesToRemove.includes(edge.target)
            )
          );

          // Also remove from completedDecisions
          setCompletedDecisions(prev =>
            prev.filter(id => id !== decisionId && !nodesToRemove.includes(id))
          );
        } else {
          // If no dependent nodes, just remove this decision from completed
          setCompletedDecisions(prev => prev.filter(id => id !== decisionId));
        }
      }

      // Mark the decision as completed
      setCompletedDecisions(prev => {
        // For a changed decision, we already removed it above
        if (isChanging) {
          return [...prev, decisionId];
        }

        // If already completed, don't add it again
        if (prev.includes(decisionId)) return prev;

        // Add the decision to completed list
        return [...prev, decisionId];
      });

      // Store the last completed decision for unlocking new nodes
      setLastCompletedDecision(decisionId);

      // Store the selected option in the node data for persistence
      // while preserving the current position of the node
      setNodes(nds => {
        return nds.map(node => {
          if (node.id === decisionId) {
            // Preserve the node's current position and update only the data
            return {
              ...node,
              data: { ...node.data, selectedOption: option },
            };
          }
          return node;
        });
      });
    },
    [findDependentNodes]
  );

  // Update available decisions when completedDecisions changes
  useEffect(() => {
    // Get all available decisions
    const available = getAvailableDecisions(completedDecisions);

    // Set all available decisions for the sidebar
    setAvailableDecisions(available);

    // Keep using decisionsByCategory which contains ALL decisions
    // This allows the sidebar to show all decisions when "Show only available decisions" is unchecked
    setCategorizedDecisions(decisionsByCategory);
  }, [completedDecisions]);

  // Add unlocked nodes to canvas when a decision is completed
  useEffect(() => {
    // Check if we have a last completed decision
    if (!lastCompletedDecision) return;

    // Get unlocked decisions
    const allUnlockedDecisions = getUnlockedDecisions(lastCompletedDecision);

    // If there are unlocked decisions, add required ones to the canvas
    if (allUnlockedDecisions.length > 0) {
      // Add to canvas and return if we made changes
      const result = addUnlockedNodesToCanvas(lastCompletedDecision, allUnlockedDecisions);

      // Reset last completed decision after processing
      if (result) {
        setLastCompletedDecision(null);
      }
    } else {
      // No unlocked decisions, just reset
      setLastCompletedDecision(null);
    }
  }, [lastCompletedDecision, addUnlockedNodesToCanvas]);

  // Clear newly added nodes after they've been processed
  useEffect(() => {
    if (newlyAddedNodes.length > 0) {
      // Clear after a delay to ensure FlowChart has processed them
      const timer = setTimeout(() => {
        setNewlyAddedNodes([]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [newlyAddedNodes]);

  // Reset the state to initial values
  const resetState = useCallback(() => {
    if (DEBUG) {
      console.log('🔧 useDecisionManager: Resetting state');
    }

    // Clear state
    setCompletedDecisions([]);
    setNodes([]);
    setEdges([]);
    setLastCompletedDecision(null);
    setNewlyAddedNodes([]);

    // Reset available decisions
    setAvailableDecisions(getAvailableDecisions([]));

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);

    return true;
  }, []);

  return {
    // State
    nodes,
    setNodes,
    edges,
    setEdges,
    completedDecisions,
    availableDecisions,
    categorizedDecisions,
    newlyAddedNodes,

    // Methods
    handleDecisionComplete,
    handleRemoveNode,
    addUnlockedNodesToCanvas,
    addNodeFromSidebar,
    findDependentNodes,
    resetState,
  };
};

export default useDecisionManager;

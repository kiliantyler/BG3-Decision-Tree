// src/hooks/useDecisionManager.js - Fixed dependencies
import { useCallback, useEffect, useState } from 'react';
import { MarkerType } from 'reactflow';
import {
  getAvailableDecisions,
  getUnlockedDecisions,
} from '../data/gameDecisionManager';

// Constants for layout calculations
const VERTICAL_SPACING = 300;
const HORIZONTAL_SPACING = 250;

/**
 * Custom hook for managing decisions, nodes, and edges in the flowchart
 */
const useDecisionManager = () => {
  // State for tracking completed decisions
  const [completedDecisions, setCompletedDecisions] = useState([]);

  // State for tracking available decisions (for the sidebar)
  const [availableDecisions, setAvailableDecisions] = useState([]);

  // State for categorized decisions (for the sidebar)
  const [categorizedDecisions, setCategorizedDecisions] = useState({});

  // State for nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Track the last decision that was completed
  const [lastCompletedDecision, setLastCompletedDecision] = useState(null);

  // Find all nodes that depend on a given node (recursively)
  // Define this first to avoid the "Cannot access before initialization" error
  const findDependentNodes = useCallback(
    (nodeId) => {
      const directDependents = edges
        .filter((edge) => edge.source === nodeId)
        .map((edge) => edge.target);

      let allDependents = [...directDependents];

      // Recursively find dependents of dependents
      directDependents.forEach((depId) => {
        const subDependents = findDependentNodesInternal(depId);
        allDependents = [...allDependents, ...subDependents];
      });

      return allDependents;
    },
    [edges]
  );

  // Internal version to avoid recursion issues
  const findDependentNodesInternal = (nodeId) => {
    const directDependents = edges
      .filter((edge) => edge.source === nodeId)
      .map((edge) => edge.target);

    let allDependents = [...directDependents];

    // Recursively find dependents of dependents, but limit depth to avoid infinite loops
    directDependents.forEach((depId) => {
      // Avoid circular references by checking if we've already seen this node
      if (!allDependents.includes(depId)) {
        const childDeps = edges
          .filter((edge) => edge.source === depId)
          .map((edge) => edge.target);
        allDependents = [...allDependents, ...childDeps];
      }
    });

    return allDependents;
  };

  // Calculate position for a node based on parent and siblings
  const calculateNodePosition = useCallback(
    (parentNode, index, totalSiblings) => {
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
    },
    []
  );

  // Handle removing a node from the canvas
  const handleRemoveNode = useCallback(
    (nodeId) => {
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
        setNodes((nds) =>
          nds.filter((node) => !allNodesToRemove.includes(node.id))
        );
        setEdges((eds) =>
          eds.filter(
            (edge) =>
              !allNodesToRemove.includes(edge.source) &&
              !allNodesToRemove.includes(edge.target)
          )
        );

        // Also remove from completedDecisions
        setCompletedDecisions((prev) =>
          prev.filter((id) => !allNodesToRemove.includes(id))
        );
      } else {
        // Just remove this node
        setNodes((nds) => nds.filter((node) => node.id !== nodeId));
        setEdges((eds) =>
          eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
        );

        // Also remove from completedDecisions if present
        setCompletedDecisions((prev) => prev.filter((id) => id !== nodeId));
      }
    },
    [findDependentNodes, setNodes, setEdges, setCompletedDecisions]
  );

  // Function to add unlocked nodes to canvas with proper connections
  const addUnlockedNodesToCanvas = useCallback(
    (sourceDecisionId, unlockedDecisions) => {
      // Find the source node
      const sourceNode = nodes.find((node) => node.id === sourceDecisionId);
      if (!sourceNode) return null;

      // Filter to only required decisions (not optional ones)
      const requiredDecisions = unlockedDecisions.filter(
        (decision) => decision.required === true && !decision.optional
      );

      // Skip if no required decisions
      if (requiredDecisions.length === 0) {
        return null;
      }

      // Create new nodes and edges
      const newNodes = [];
      const newEdges = [];
      const newNodeIds = [];

      // Calculate positions for new nodes
      requiredDecisions.forEach((decision, index) => {
        // Skip if node already exists on canvas
        if (nodes.some((node) => node.id === decision.id)) {
          return;
        }

        // Calculate position
        const position = calculateNodePosition(
          sourceNode,
          index,
          requiredDecisions.length
        );

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
        setNodes((nds) => [...nds, ...newNodes]);
        setEdges((eds) => [...eds, ...newEdges]);
        return { newNodeIds, sourceNodeId: sourceDecisionId };
      }

      return null;
    },
    [nodes, calculateNodePosition]
  );

  // Add a new node when dragged from sidebar
  const addNodeFromSidebar = useCallback(
    (decisionData, position) => {
      // Check if node already exists
      if (nodes.some((node) => node.id === decisionData.id)) {
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
      setNodes((nds) => [...nds, newNode]);

      // If this node has prerequisites, automatically create connections
      if (decisionData.prerequisites && decisionData.prerequisites.length > 0) {
        const newEdges = [];

        // For each prerequisite, check if it's on the canvas
        decisionData.prerequisites.forEach((prereqId) => {
          const sourceNode = nodes.find((node) => node.id === prereqId);
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
          setEdges((eds) => [...eds, ...newEdges]);
        }
      }

      return { id: decisionData.id };
    },
    [nodes, handleRemoveNode]
  );

  // Handle when a decision is completed or changed
  const handleDecisionComplete = useCallback(
    (decisionId, option, isChanging = false) => {
      console.log(
        `Decision ${decisionId} ${
          isChanging ? 'changed to' : 'completed with'
        } option: ${option}`
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

          setNodes((nds) =>
            nds.filter((node) => !nodesToRemove.includes(node.id))
          );
          setEdges((eds) =>
            eds.filter(
              (edge) =>
                !nodesToRemove.includes(edge.source) &&
                !nodesToRemove.includes(edge.target)
            )
          );

          // Also remove from completedDecisions
          setCompletedDecisions((prev) =>
            prev.filter(
              (id) => id !== decisionId && !nodesToRemove.includes(id)
            )
          );
        } else {
          // If no dependent nodes, just remove this decision from completed
          setCompletedDecisions((prev) =>
            prev.filter((id) => id !== decisionId)
          );
        }
      }

      // Mark the decision as completed
      setCompletedDecisions((prev) => {
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

      // Also store the selected option in the node data for persistence
      setNodes((nds) =>
        nds.map((node) =>
          node.id === decisionId
            ? { ...node, data: { ...node.data, selectedOption: option } }
            : node
        )
      );
    },
    [findDependentNodes]
  );

  // Update available decisions when completedDecisions changes
  useEffect(() => {
    // Get all available decisions
    const available = getAvailableDecisions(completedDecisions);

    // Split into required and optional
    const required = available.filter(
      (d) => d.required === true && !d.optional
    );
    const optional = available.filter((d) => d.optional === true);

    // Set all available decisions for the sidebar
    setAvailableDecisions(available);

    // Organize available decisions by category for the sidebar
    const byCategory = {};
    available.forEach((decision) => {
      if (!byCategory[decision.category]) {
        byCategory[decision.category] = [];
      }
      byCategory[decision.category].push(decision);
    });
    setCategorizedDecisions(byCategory);
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
      const result = addUnlockedNodesToCanvas(
        lastCompletedDecision,
        allUnlockedDecisions
      );

      // Reset last completed decision after processing
      if (result) {
        setLastCompletedDecision(null);
      }
    } else {
      // No unlocked decisions, just reset
      setLastCompletedDecision(null);
    }
  }, [lastCompletedDecision, addUnlockedNodesToCanvas]);

  return {
    // State
    nodes,
    setNodes,
    edges,
    setEdges,
    completedDecisions,
    availableDecisions,
    categorizedDecisions,

    // Methods
    handleDecisionComplete,
    handleRemoveNode,
    addUnlockedNodesToCanvas,
    addNodeFromSidebar,
    findDependentNodes,
  };
};

export default useDecisionManager;

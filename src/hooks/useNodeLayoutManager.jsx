// src/hooks/useNodeLayoutManager.js
import { useCallback } from 'react';

/**
 * Custom hook for managing node layout and viewport
 */
const useNodeLayoutManager = (reactFlowInstance) => {
  // Constants for layout calculations
  const VERTICAL_SPACING = 300;
  const HORIZONTAL_SPACING = 250;

  /**
   * Calculate position for a node based on parent and siblings
   */
  const calculateNodePosition = useCallback((parentNode, index, totalSiblings) => {
    // If there's no parent node (for the starting node), use default position
    if (!parentNode) {
      return { x: 50, y: 50 };
    }

    // Get parent position
    const parentX = parentNode.position.x;
    const parentY = parentNode.position.y;

    // Calculate horizontal offset for multiple children
    // This centers the children below the parent
    let horizontalOffset = 0;
    if (totalSiblings > 1) {
      // Calculate total width of all siblings
      const totalWidth = (totalSiblings - 1) * HORIZONTAL_SPACING;
      // Calculate starting offset to center the group
      horizontalOffset = -totalWidth / 2 + (index * HORIZONTAL_SPACING);
    }

    // Place node below parent, with horizontal offset if there are siblings
    return {
      x: parentX + horizontalOffset,
      y: parentY + VERTICAL_SPACING
    };
  }, [VERTICAL_SPACING, HORIZONTAL_SPACING]);

  /**
   * Calculate center point between a set of positions
   */
  const calculateCenterPoint = useCallback((positions) => {
    if (!positions || positions.length === 0) {
      return { x: 0, y: 0 };
    }

    const sumX = positions.reduce((sum, pos) => sum + pos.x, 0);
    const sumY = positions.reduce((sum, pos) => sum + pos.y, 0);

    return {
      x: sumX / positions.length,
      y: sumY / positions.length
    };
  }, []);

  /**
   * Set viewport to focus on a specific area
   */
  const focusViewport = useCallback((centerPoint, duration = 800, parentNode = null) => {
    if (!reactFlowInstance) return;

    setTimeout(() => {
      // If we have a specific center point, use it
      let centerX = centerPoint?.x;
      let centerY = centerPoint?.y;

      // If we have a parent node and no center point, use a point below the parent
      if (!centerPoint && parentNode) {
        centerX = parentNode.position.x;
        centerY = parentNode.position.y + VERTICAL_SPACING / 2;
      }

      // If we have valid coordinates to center on
      if (centerX !== undefined && centerY !== undefined) {
        // Get current viewport info
        const { zoom } = reactFlowInstance.getViewport();

        // Use the setViewport API for direct control
        reactFlowInstance.setViewport({
          x: -centerX * zoom + window.innerWidth / 2,
          y: -centerY * zoom + window.innerHeight / 2,
          zoom: Math.min(zoom, 1) // Maintain zoom but cap at 1 for readability
        }, { duration });
      }
    }, 300); // Timeout to ensure nodes are rendered
  }, [reactFlowInstance, VERTICAL_SPACING]);

  /**
   * Fit view to show all nodes or specific nodes
   */
  const fitView = useCallback((nodeIds = null, padding = 0.5) => {
    if (!reactFlowInstance) return;

    setTimeout(() => {
      reactFlowInstance.fitView({
        padding,
        includeHiddenNodes: false,
        nodes: nodeIds
      });
    }, 100);
  }, [reactFlowInstance]);

  return {
    calculateNodePosition,
    calculateCenterPoint,
    focusViewport,
    fitView
  };
};

export default useNodeLayoutManager;
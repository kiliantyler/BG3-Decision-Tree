// src/hooks/useNodeLayoutManager.jsx
import { useCallback } from 'react';

/**
 * Custom hook for managing node layout and viewport
 */
const useNodeLayoutManager = (reactFlowInstance) => {
  // Constants for layout calculations
  const VERTICAL_SPACING = 300;
  const HORIZONTAL_SPACING = 250;
  const DEFAULT_ZOOM = 0.85; // Default zoom level for new nodes

  /**
   * Calculate position for a node based on parent and siblings
   */
  const calculateNodePosition = useCallback(
    (parentNode, index, totalSiblings) => {
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
        horizontalOffset = -totalWidth / 2 + index * HORIZONTAL_SPACING;
      }

      // Place node below parent, with horizontal offset if there are siblings
      return {
        x: parentX + horizontalOffset,
        y: parentY + VERTICAL_SPACING,
      };
    },
    [VERTICAL_SPACING, HORIZONTAL_SPACING]
  );

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
      y: sumY / positions.length,
    };
  }, []);

  /**
   * Focus viewport on a specific node or position
   * @param {Object} options - Options for focusing the viewport
   * @param {Object} options.node - Node to focus on
   * @param {Object} options.position - Position to focus on (if no node)
   * @param {Number} options.zoom - Zoom level (if null, preserves current zoom)
   * @param {Number} options.duration - Animation duration in ms (default: 800)
   */
  const focusViewport = useCallback(
    (options = {}) => {
      if (!reactFlowInstance) return;

      const { node, position, zoom = null, duration = 800 } = options;

      setTimeout(() => {
        // Determine the center point to focus on
        let centerX, centerY;

        if (node) {
          // Focus on a specific node
          centerX = node.position.x;
          centerY = node.position.y;
        } else if (position) {
          // Focus on a specific position
          centerX = position.x;
          centerY = position.y;
        } else {
          // If neither node nor position provided, do nothing
          return;
        }

        // Get current viewport to preserve zoom if not specified
        const currentViewport = reactFlowInstance.getViewport();
        const zoomLevel = zoom !== null ? zoom : currentViewport.zoom;

        // Get the container element
        const container = document.querySelector('.reactflow-wrapper');
        if (!container) {
          console.warn('Could not find ReactFlow container');
          return;
        }

        // Get the dimensions of the container
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // For proper centering, we need to account for the sidebar width
        // The sidebar has a width of 300px as defined in the CSS
        const sidebarWidth = 300;

        // Calculate the flow area width (total container width minus sidebar)
        const flowAreaWidth = containerWidth - sidebarWidth;

        // Calculate the center of the flow area
        const effectiveCenterX = sidebarWidth + flowAreaWidth / 2;

        // Set viewport position to center the node in the flow area
        reactFlowInstance.setViewport(
          {
            x: -centerX * zoomLevel + effectiveCenterX,
            y: -centerY * zoomLevel + containerHeight / 2,
            zoom: zoomLevel,
          },
          { duration }
        );
      }, 100); // Small delay to ensure nodes are rendered
    },
    [reactFlowInstance]
  );

  /**
   * Focus on a newly added node or set of nodes
   * @param {Object|Array} nodes - Single node or array of nodes to focus on
   * @param {Number} duration - Animation duration in ms
   */
  const focusOnNewNodes = useCallback(
    (nodes, duration = 800) => {
      if (!reactFlowInstance) return;

      if (!nodes) return;

      // Handle both single node and array of nodes
      const nodeArray = Array.isArray(nodes) ? nodes : [nodes];

      if (nodeArray.length === 0) return;

      // Get current viewport zoom level - we'll preserve this
      const { zoom } = reactFlowInstance.getViewport();

      if (nodeArray.length === 1) {
        // If single node, focus directly on it
        focusViewport({
          node: nodeArray[0],
          zoom: zoom, // Preserve current zoom level
          duration,
        });
      } else {
        // If multiple nodes, calculate center point between them
        const positions = nodeArray.map((node) => node.position);
        const centerPoint = calculateCenterPoint(positions);

        focusViewport({
          position: centerPoint,
          zoom: zoom, // Preserve current zoom level
          duration,
        });
      }
    },
    [reactFlowInstance, focusViewport, calculateCenterPoint]
  );

  /**
   * Fit view to show all nodes or specific nodes
   */
  const fitView = useCallback(
    (nodeIds = null, padding = 0.5) => {
      if (!reactFlowInstance) return;

      setTimeout(() => {
        reactFlowInstance.fitView({
          padding,
          includeHiddenNodes: false,
          nodes: nodeIds,
        });
      }, 100);
    },
    [reactFlowInstance]
  );

  return {
    calculateNodePosition,
    calculateCenterPoint,
    focusViewport,
    focusOnNewNodes,
    fitView,
  };
};

export default useNodeLayoutManager;

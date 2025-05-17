/**
 * Data Index
 *
 * This is the main entry point for all data-related exports.
 * It re-exports everything from the decision manager and also
 * provides direct access to specific decisions or utilities.
 */

// Re-export everything from the manager
export * from './gameDecisionManager.js';

// Re-export all decisions
export * from './decisions/index.js';

// Export specific decisions for direct access
export { mindflayerPod as startingDecision } from './decisions/act1/nautiloidShip/mindflayerPod.js';

// Export any other data or utility functions
export * from './gameDecisionTypes.js';

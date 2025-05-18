/**
 * All Game Decisions
 * 
 * This index file aggregates decisions from all acts and
 * provides utility exports.
 */

import { act1Decisions, act1DecisionsMap, act1StartingDecision } from './act1/index.js';
import { act2Decisions, act2DecisionsMap } from './act2/index.js';
// import { act3Decisions, act3DecisionsMap } from './act3/index.js';

// Export individual act decision sets
export {
  act1Decisions,
  act2Decisions
};

// Export decision maps
export {
  act1DecisionsMap,
  act2DecisionsMap
};

// Export starting decision
export { act1StartingDecision };

// Combine all decisions across all acts
export const allDecisions = [
  ...act1Decisions,
  ...act2Decisions,
  // ...act3Decisions
];

// Create a global decision map for quick lookups by ID
export const decisionMap = {
  ...act1DecisionsMap,
  ...act2DecisionsMap,
  // ...act3DecisionsMap
};

// Create category lookup for sidebar organization
export const decisionsByCategory = allDecisions.reduce((categories, decision) => {
  if (!categories[decision.category]) {
    categories[decision.category] = [];
  }

  categories[decision.category].push(decision);
  return categories;
}, {});

export default allDecisions;
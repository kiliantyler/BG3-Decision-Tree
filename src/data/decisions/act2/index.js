/**
 * Act 2 Decisions
 * 
 * This file aggregates all decisions from Act 2 across
 * different locations.
 */

import { shadowCursedLandsDecisions } from './shadowCursedLands/index.js';

// Export individual location decision sets
export {
  shadowCursedLandsDecisions
};

// Combine all Act 1 decisions
export const act2Decisions = [
  ...shadowCursedLandsDecisions
];

// Create a lookup map for quick decision access by ID
export const act2DecisionsMap = act2Decisions.reduce((map, decision) => {
  map[decision.id] = decision;
  return map;
}, {});

export default act2Decisions;
/**
 * Act 1 Decisions
 *
 * This file aggregates all decisions from Act 1 across
 * different locations.
 */

import { druidGroveDecisions } from './druidGrove/index.js';
import { goblinCampDecisions } from './goblinCamp/index.js';
import { nautiloidDecisions } from './nautiloidShip/index.js';
import { wildernessDecisions } from './wilderness/index.js';

// Export individual location decision sets
export {
  druidGroveDecisions,
  goblinCampDecisions,
  nautiloidDecisions,
  wildernessDecisions
};

// Find the starting decision for quick access
export const act1StartingDecision = nautiloidDecisions.find(d => d.prerequisites.length === 0);

// Combine all Act 1 decisions
export const act1Decisions = [
  ...nautiloidDecisions,
  ...wildernessDecisions,
  ...druidGroveDecisions,
  ...goblinCampDecisions
];

// Create a lookup map for quick decision access by ID
export const act1DecisionsMap = act1Decisions.reduce((map, decision) => {
  map[decision.id] = decision;
  return map;
}, {});

export default act1Decisions;

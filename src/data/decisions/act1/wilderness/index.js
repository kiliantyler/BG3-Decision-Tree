/**
 * Wilderness Decisions
 * 
 * This file exports all decisions that take place in the
 * Wilderness in Act 1.
 */

import { crashSiteAwakening } from './crashSiteAwakening.js';
import { druidGroveArrival } from './druidGroveArrival.js';
import { owlbearCub } from './owlbearCub.js';
import { woundedTiefling } from './woundedTiefling.js';

// Export individual decisions for direct import
export { crashSiteAwakening, druidGroveArrival, owlbearCub, woundedTiefling };

// Export all decisions as an array for bulk import
export const wildernessDecisions = [
  crashSiteAwakening,
  woundedTiefling,
  druidGroveArrival,
  owlbearCub
];

export default wildernessDecisions;
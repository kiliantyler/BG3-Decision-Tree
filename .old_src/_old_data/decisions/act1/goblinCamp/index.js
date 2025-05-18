/**
 * Goblin Camp Decisions
 * 
 * This file exports all decisions that take place in the
 * Goblin Camp in Act 1.
 */

import { act1Finale } from './act1Finale.js';
import { goblinCampDiscovery } from './goblinCampDiscovery.js';
import { goblinLeaders } from './goblinLeaders.js';
import { halsinRescue } from './halsinRescue.js';
import { trueSoulGut } from './trueSoulGut.js';

// Export individual decisions for direct import
export { act1Finale, goblinCampDiscovery, goblinLeaders, halsinRescue, trueSoulGut };

// Export all decisions as an array for bulk import
export const goblinCampDecisions = [
  goblinCampDiscovery,
  act1Finale,
  goblinLeaders,
  halsinRescue,
  trueSoulGut
];

export default goblinCampDecisions;
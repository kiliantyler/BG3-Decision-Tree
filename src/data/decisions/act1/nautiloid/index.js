/**
 * Nautiloid Ship Decisions
 * 
 * This file exports all decisions that take place on the
 * mindflayer nautiloid ship in Act 1.
 */

import { laezel } from './laezel.js';
import { mindflayerPod } from './mindflayerPod.js';
import { usOrThem } from './usOrThem.js';

// Export individual decisions for direct import
export { laezel, mindflayerPod, usOrThem };

// Export all decisions as an array for bulk import
export const nautiloidDecisions = [
  mindflayerPod,
  laezel,
  usOrThem
];

export default nautiloidDecisions;
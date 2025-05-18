/**
 * Game Decision Manager
 * 
 * Provides core utility functions for working with the decision tree,
 * handling dependencies, and determining available decisions.
 */

import { act1StartingDecision, allDecisions, decisionMap } from './decisions/index.js';

/**
 * Get the starting node (node with no prerequisites)
 * @returns {Object} The first decision in the game
 */
export const getStartingNode = () => {
  console.log("Getting starting node, total decisions:", allDecisions.length);
  // We know this is in Act 1, so we can use the pre-found decision
  return act1StartingDecision;
};

/**
 * Helper function to get all currently available decisions based on completed decisions
 * @param {string[]} completedDecisions - Array of decision IDs that have been completed
 * @returns {Object[]} - Array of decision objects that are currently available
 */
export const getAvailableDecisions = (completedDecisions = []) => {
  console.log("Getting available decisions, completed:", completedDecisions);
  return allDecisions.filter(decision => {
    // Decision is available if all prerequisites are completed
    const prerequisitesMet = decision.prerequisites.every(prereq =>
      completedDecisions.includes(prereq)
    );

    // Decision is not already completed
    const notCompleted = !completedDecisions.includes(decision.id);

    // Decision is not mutually exclusive with any completed decisions
    const notExcluded = !completedDecisions.some(completedId => {
      const completedDecision = decisionMap[completedId];
      return completedDecision && completedDecision.mutuallyExclusive?.includes(decision.id);
    });

    return prerequisitesMet && notCompleted && notExcluded;
  });
};

/**
 * Get all required decisions that should be automatically added to the canvas
 * @param {string[]} completedDecisions - Array of decision IDs that have been completed
 * @returns {Object[]} - Array of required decision objects
 */
export const getRequiredDecisions = (completedDecisions = []) => {
  // Filter available decisions to only those that are required (not optional)
  const available = getAvailableDecisions(completedDecisions);
  return available.filter(decision => decision.required === true && !decision.optional);
};

/**
 * Get all optional decisions that are currently available
 * @param {string[]} completedDecisions - Array of decision IDs that have been completed
 * @returns {Object[]} - Array of optional decision objects
 */
export const getOptionalDecisions = (completedDecisions = []) => {
  // Filter available decisions to only those that are optional
  const available = getAvailableDecisions(completedDecisions);
  return available.filter(decision => decision.optional === true);
};

/**
 * Get decisions that become available after completing a specific decision
 * @param {string} decisionId - ID of the decision to check
 * @param {boolean} requiredOnly - If true, only return required decisions
 * @returns {Object[]} - Array of decision objects that are unlocked
 */
export const getUnlockedDecisions = (decisionId, requiredOnly = false) => {
  console.log("Getting unlocked decisions for:", decisionId);
  const decision = decisionMap[decisionId];
  if (!decision) {
    console.log("Decision not found:", decisionId);
    return [];
  }

  console.log("Unlocks:", decision.unlocks);
  // Use the decision map for faster lookups
  const unlocked = decision.unlocks?.map(id => decisionMap[id]).filter(Boolean) || [];

  console.log("Unlocked decisions:", unlocked.length);
  return requiredOnly
    ? unlocked.filter(d => d.required === true && !d.optional)
    : unlocked;
};

/**
 * Group all decisions by their categories
 * @returns {Object} - Object with categories as keys and arrays of decisions as values
 */
export const getDecisionsByAllCategories = () => {
  // We already precomputed this in the decisions/index.js
  // but we re-export it here for API consistency
  return decisionsByCategory;
};

/**
 * Find a decision by ID
 * @param {string} id - The decision ID to find
 * @returns {Object|null} - The decision object or null if not found
 */
export const getDecisionById = (id) => {
  return decisionMap[id] || null;
};

/**
 * Get all decisions in a specific act
 * @param {number} actNumber - The act number (1, 2, or 3)
 * @returns {Object[]} - Array of decisions in the specified act
 */
export const getDecisionsByAct = (actNumber) => {
  switch (actNumber) {
    case 1:
      return act1Decisions;
    case 2:
      return act2Decisions;
    case 3:
      return act3Decisions;
    default:
      return [];
  }
};

// Re-export all decisions for backward compatibility
export { allDecisions as gameDecisions };

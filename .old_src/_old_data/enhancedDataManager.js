// src/data/enhancedDataManager.js
/**
 * Enhanced Data Manager
 * 
 * This file provides a centralized way to access game decision data
 * with proper support for HMR (Hot Module Replacement) in Vite.
 */

import * as Act1Data from './decisions/act1/index.js';
import * as Act2Data from './decisions/act2/index.js';
// import * as Act3Data from './decisions/act3/index.js'; // Uncomment when Act3 is ready

// Create a store object to hold all game data 
const store = {
  // Decision collections
  decisions: {
    act1: Act1Data.act1Decisions || [],
    act2: Act2Data.act2Decisions || [],
    // act3: Act3Data.act3Decisions || [],
  },

  // Maps for quick lookups
  decisionMaps: {
    act1: Act1Data.act1DecisionsMap || {},
    act2: Act2Data.act2DecisionsMap || {},
    // act3: Act3Data.act3DecisionsMap || {},
  },

  // Starting points
  startingNodes: {
    act1: Act1Data.act1StartingDecision,
  },

  // Derived data
  allDecisions: [],
  globalDecisionMap: {},
  decisionsByCategory: {},

  // Update method to refresh all derived data
  refreshData() {
    console.log('[DataManager] Refreshing data...');

    // Combine all decisions
    this.allDecisions = [
      ...this.decisions.act1,
      ...this.decisions.act2,
      // ...this.decisions.act3,
    ];

    // Create global decision map
    this.globalDecisionMap = {
      ...this.decisionMaps.act1,
      ...this.decisionMaps.act2,
      // ...this.decisionMaps.act3,
    };

    // Organize by category
    this.decisionsByCategory = this.allDecisions.reduce((categories, decision) => {
      if (!categories[decision.category]) {
        categories[decision.category] = [];
      }

      categories[decision.category].push(decision);
      return categories;
    }, {});

    console.log(`[DataManager] Refreshed with ${this.allDecisions.length} total decisions`);
  }
};

// Initial data refresh
store.refreshData();

// Set up HMR for decision data
if (import.meta.hot) {
  import.meta.hot.accept(['./decisions/act1/index.js', './decisions/act2/index.js'], (modules) => {
    console.log('[HMR] Updating decision data...', modules);

    // Update Act1 data if it changed
    if (modules[0]) {
      store.decisions.act1 = modules[0].act1Decisions || [];
      store.decisionMaps.act1 = modules[0].act1DecisionsMap || {};
      store.startingNodes.act1 = modules[0].act1StartingDecision;
    }

    // Update Act2 data if it changed
    if (modules[1]) {
      store.decisions.act2 = modules[1].act2Decisions || [];
      store.decisionMaps.act2 = modules[1].act2DecisionsMap || {};
    }

    // Refresh all derived data
    store.refreshData();
  });
}

/**
 * Get the starting node for the game
 * @returns {Object} The first decision in the game
 */
export function getStartingNode() {
  return store.startingNodes.act1;
}

/**
 * Helper function to get all currently available decisions based on completed decisions
 * @param {string[]} completedDecisions - Array of decision IDs that have been completed
 * @returns {Object[]} - Array of decision objects that are currently available
 */
export function getAvailableDecisions(completedDecisions = []) {
  return store.allDecisions.filter(decision => {
    // Decision is available if all prerequisites are completed
    const prerequisitesMet = decision.prerequisites.every(prereq =>
      completedDecisions.includes(prereq)
    );

    // Decision is not already completed
    const notCompleted = !completedDecisions.includes(decision.id);

    // Decision is not mutually exclusive with any completed decisions
    const notExcluded = !completedDecisions.some(completedId => {
      const completedDecision = store.globalDecisionMap[completedId];
      return completedDecision && completedDecision.mutuallyExclusive?.includes(decision.id);
    });

    return prerequisitesMet && notCompleted && notExcluded;
  });
}

/**
 * Get all required decisions that should be automatically added to the canvas
 * @param {string[]} completedDecisions - Array of decision IDs that have been completed
 * @returns {Object[]} - Array of required decision objects
 */
export function getRequiredDecisions(completedDecisions = []) {
  // Filter available decisions to only those that are required (not optional)
  const available = getAvailableDecisions(completedDecisions);
  return available.filter(decision => decision.required === true && !decision.optional);
}

/**
 * Get all optional decisions that are currently available
 * @param {string[]} completedDecisions - Array of decision IDs that have been completed
 * @returns {Object[]} - Array of optional decision objects
 */
export function getOptionalDecisions(completedDecisions = []) {
  // Filter available decisions to only those that are optional
  const available = getAvailableDecisions(completedDecisions);
  return available.filter(decision => decision.optional === true);
}

/**
 * Get decisions that become available after completing a specific decision
 * @param {string} decisionId - ID of the decision to check
 * @param {boolean} requiredOnly - If true, only return required decisions
 * @returns {Object[]} - Array of decision objects that are unlocked
 */
export function getUnlockedDecisions(decisionId, requiredOnly = false) {
  const decision = store.globalDecisionMap[decisionId];
  if (!decision) {
    console.warn(`[DataManager] Decision not found: ${decisionId}`);
    return [];
  }

  // Use the decision map for faster lookups
  const unlocked = decision.unlocks?.map(id => store.globalDecisionMap[id]).filter(Boolean) || [];

  return requiredOnly
    ? unlocked.filter(d => d.required === true && !d.optional)
    : unlocked;
}

/**
 * Find a decision by ID
 * @param {string} id - The decision ID to find
 * @returns {Object|null} - The decision object or null if not found
 */
export function getDecisionById(id) {
  return store.globalDecisionMap[id] || null;
}

/**
 * Get decisions by category
 * @returns {Object} - Object with categories as keys and arrays of decisions as values
 */
export function getDecisionsByCategory() {
  return store.decisionsByCategory;
}

// Export everything from the store for convenience
export const allDecisions = store.allDecisions;
export const decisionMap = store.globalDecisionMap;
export const decisionsByCategory = store.decisionsByCategory;
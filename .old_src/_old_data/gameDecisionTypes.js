/**
 * Game Decision Types
 * 
 * This file defines TypeScript-like type definitions for the decision data structure.
 * While not enforced at runtime, these serve as documentation for the expected
 * shape of decision objects.
 */

/**
 * @typedef {Object} GameDecision
 * @property {string} id - Unique identifier for the decision
 * @property {string} type - Type of node ("decision" or "outcome")
 * @property {string} category - Grouping category for sidebar organization
 * @property {string} label - Display name for the decision
 * @property {string} description - Detailed explanation of the decision point
 * @property {string[]} options - Possible choices at this decision point
 * @property {string[]} prerequisites - Array of decision IDs that must be completed before this is available
 * @property {string[]} unlocks - Array of decision IDs that become available after completing this one
 * @property {string[]} mutuallyExclusive - Array of decision IDs that become unavailable if this is chosen
 * @property {boolean} optional - Whether this decision is optional or part of the main quest
 * @property {boolean} required - Whether this decision is required for progression
 * 
 * @property {string} [location] - Optional metadata: location in the game world
 * @property {string[]} [characters] - Optional metadata: characters involved
 * @property {string} [consequenceNotes] - Optional metadata: notes about consequences
 * @property {Object} [metadata] - Any additional metadata specific to this decision
 */

/**
 * @typedef {Object} DecisionMap
 * @type {Object.<string, GameDecision>}
 * A mapping of decision IDs to their corresponding decision objects
 */

/**
 * @typedef {Object} CategoryMap
 * @type {Object.<string, GameDecision[]>}
 * A mapping of category names to arrays of decisions in those categories
 */

// Export a validation function that can check if a decision has the required fields
export const validateDecision = (decision) => {
  // Required fields
  const requiredFields = [
    'id', 'type', 'category', 'label', 'description',
    'options', 'prerequisites', 'unlocks', 'mutuallyExclusive'
  ];

  // Check all required fields exist
  const missingFields = requiredFields.filter(field =>
    !decision.hasOwnProperty(field)
  );

  if (missingFields.length > 0) {
    return {
      valid: false,
      errors: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  // Validate specific field types
  if (typeof decision.id !== 'string') {
    return { valid: false, errors: 'id must be a string' };
  }

  if (!Array.isArray(decision.options)) {
    return { valid: false, errors: 'options must be an array' };
  }

  if (!Array.isArray(decision.prerequisites)) {
    return { valid: false, errors: 'prerequisites must be an array' };
  }

  // If we got here, the decision is valid
  return { valid: true };
};

// Export constants for decision types
export const DECISION_TYPES = {
  DECISION: 'decision',
  OUTCOME: 'outcome'
};

// Export constants for required vs optional
export const DECISION_REQUIREMENTS = {
  REQUIRED: 'required',
  OPTIONAL: 'optional'
};
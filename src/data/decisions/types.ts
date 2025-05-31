/**
 * Decision and option type definitions
 * These are separated from implementation files to avoid circular dependencies
 */

// Define dependency types
export type DecisionDependency = {
  decision: object // Direct reference to decision object
  option: object // Direct reference to option object
  type: 'excludes' | 'requires' // Whether this option excludes or requires another decision
}

// Option type definition with optional dependencies
export type OptionType = {
  name: string
  dependencies?: readonly DecisionDependency[] // Optional dependencies for this specific option (supports readonly arrays)
}

// Base type for decision objects
export type DecisionBase = {
  name: string
  description: string
  dependencies?: readonly DecisionDependency[] // Optional dependencies for entire decision (supports readonly arrays)
}

// Define the return type for createDecision
export type Decision<T extends Record<string, OptionType>> = DecisionBase &
  T & {
    id: string
    options: (OptionType & { id: string })[]
  }

/**
 * Creates a decision object with named option access and dynamic options array
 * @param decision Base decision properties including optional dependencies
 * @param options Object containing option entries
 * @param id Optional explicit ID
 * @returns Decision object with options accessible both as properties and as array
 */
export function createDecision<T extends Record<string, OptionType>>(
  decision: DecisionBase,
  options: T,
  id?: string, // Optional ID parameter (defaults to name if not provided)
): Decision<T> {
  // Extract option entries and create options array
  const optionsArray = Object.entries(options).map(([key, value]) => ({
    ...(value as OptionType),
    id: key, // Use the property name as the ID
  }))

  // Create the result object by combining everything
  const decisionId = id || decision.name.replace(/\s+/g, '')

  // Return the combined object
  return {
    ...decision,
    ...options,
    id: decisionId,
    options: optionsArray,
  } as Decision<T>
}

import type { Decision } from '@/types'

/**
 * Determine if a decision is currently unavailable
 * A decision is unavailable if:
 * 1. It has prerequisites that haven't been completed yet
 * 2. Another decision that makes this one mutually exclusive has been completed
 */
export function isDecisionUnavailable(
  decision: Decision,
  completedDecisions: Decision[] = [],
): boolean {
  // Add debug logging
  console.log(`Checking availability for decision: ${decision.id}`)
  console.log(`Decision prerequisites:`, decision.prerequisites)
  console.log(`Decision mutuallyExclusive:`, decision.mutuallyExclusive)
  console.log(
    `Completed decisions:`,
    completedDecisions.map(d => d.id),
  )
  // Check if decision has prerequisites that haven't been completed
  if (decision.prerequisites && decision.prerequisites.length > 0) {
    const prereqsMet = decision.prerequisites.every(prerequisite =>
      completedDecisions.some(completed => completed.id === prerequisite.id),
    )
    if (!prereqsMet) return true
  }

  // Check if any decisions that make this one mutually exclusive have been completed
  for (const completedDecision of completedDecisions) {
    // Check if this decision is in the completedDecision's mutuallyExclusive list
    if (
      completedDecision.mutuallyExclusive?.some(
        mutuallyExclusiveDecision =>
          mutuallyExclusiveDecision.id === decision.id,
      )
    ) {
      return true
    }

    // Check if the completed decision is in this decision's mutuallyExclusive list
    if (
      decision.mutuallyExclusive?.some(
        mutuallyExclusiveDecision =>
          mutuallyExclusiveDecision.id === completedDecision.id,
      )
    ) {
      return true
    }
  }

  return false
}

/**
 * For mock/demo purposes, simulate some completed decisions based on the decision ID
 * In a real app, this would come from the game state
 */
// Import actual decisions from our mock data
import { GoblinCamp, OwlbearCub } from '@mock/decisions'

/**
 * For demo purposes, returns a list of decisions that are considered "completed"
 * In a real app, this would come from the game state or user progress
 */
export function getCompletedDecisionsForDemo(): Decision[] {
  // Return the actual decision objects from our mock data
  // This ensures they match the Decision type exactly
  return [
    GoblinCamp, // Completing this should enable decisions that require it
    OwlbearCub, // This will make mutually exclusive decisions unavailable
  ]
}

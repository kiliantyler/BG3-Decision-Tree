import type { Decision } from '@/types'

/**
 * Determine if a decision is currently unavailable
 * A decision is unavailable if:
 * 1. It has dependencies with type 'requires' that haven't been completed
 * 2. It has dependencies with type 'excludes' that have been completed
 * 3. A completed decision has an 'excludes' dependency on it
 */
export function isDecisionUnavailable(
  decision: Decision<any>,
  completedDecisions: Decision<any>[] = [],
): boolean {
  // Check if decision has dependencies that make it unavailable
  if (decision.dependencies && decision.dependencies.length > 0) {
    // Check for 'requires' dependencies that haven't been completed
    const requiresDeps = decision.dependencies.filter(
      (dep: import('@/types').DecisionDependency) => dep.type === 'requires',
    )
    if (requiresDeps.length > 0) {
      const requiresMet = requiresDeps.every((dep: any) =>
        completedDecisions.some(
          completed => completed.id === (dep.decision as any).id,
        ),
      )
      if (!requiresMet) return true
    }

    // Check for 'excludes' dependencies that have been completed
    const excludesDeps = decision.dependencies.filter(
      (dep: import('@/types').DecisionDependency) => dep.type === 'excludes',
    )
    if (excludesDeps.length > 0) {
      const isExcluded = excludesDeps.some((dep: any) =>
        completedDecisions.some(
          completed => completed.id === (dep.decision as any).id,
        ),
      )
      if (isExcluded) return true
    }
  }

  // Check if any completed decision has an 'excludes' dependency on this decision
  for (const completedDecision of completedDecisions) {
    if (
      completedDecision.dependencies?.some(
        (dep: any) =>
          dep.type === 'excludes' && (dep.decision as any).id === decision.id,
      )
    ) {
      return true
    }
  }

  return false
}

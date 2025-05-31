import type { Act, Character, ID } from '@/types'
import type { ReactNode } from 'react'

/**
 * Type for an individual option within a decision
 */
export interface DecisionOption {
  text: string
  required_party_members?: Character[] // Required party members for this option
  mutuallyExclusive?: Decision[] // Decisions that become unavailable
}

export enum DecisionType {
  DECISION = 'decision',
  OUTCOME = 'outcome',
}

/**
 * Main Decision type representing a game decision point
 */
export interface Decision {
  id: ID // Unique identifier (e.g., "nautiloid_start")
  act: Act // Act in which the decision occurs
  type: DecisionType // Usually "decision" (or "outcome" for end states)
  description: string // Full description of the situation
  options: DecisionOption[] // Object of possible choices
  prerequisites?: Decision[] // Decisions that must be completed first
  unlocks?: Decision[] // Decisions this unlocks
  mutuallyExclusive?: Decision[] // Decisions that become unavailable
  required?: boolean // Is this required for progression?
  requiredCharacter?: Character[] // Required party members
  wikiLink?: URL // Optional link to a wiki page for more information
}

export interface DecisionNodeProps {
  decision: Decision
  isSelected?: boolean
  isCompleted?: boolean
  isDisabled?: boolean
  className?: string
  onSelect?: (decision: Decision) => void
  children?: ReactNode
}

export interface DecisionOptionProps {
  option: DecisionOption
  index: number
  isAvailable: boolean
  isSelected?: boolean
  onSelect?: (option: DecisionOption) => void
  className?: string
}

export interface DecisionFlowProps {
  decisions: Decision[]
  currentDecision?: Decision
  completedDecisions?: ID[]
  onDecisionSelect?: (decision: Decision) => void
  onOptionSelect?: (decision: Decision, option: DecisionOption) => void
  className?: string
}

export interface DecisionContextValue {
  decisions: Decision[]
  currentDecision: Decision | null
  completedDecisions: ID[]
  selectDecision: (decision: Decision) => void
  completeDecision: (decisionId: ID, optionIndex: number) => void
  getAvailableDecisions: () => Decision[]
}

export type DecisionTemplate = Decision

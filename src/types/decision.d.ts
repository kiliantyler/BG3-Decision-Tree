import { PlayableCharacterType } from '@/types/character'

/**
 * Type for an individual option within a decision
 */

export interface DecisionOption {
  text: string
  required_party_members?: CharacterType[] // Required party members for this option
}

/**
 * Type for the options object containing multiple decision options
 */
export interface DecisionOptions {
  [key: string]: DecisionOption
}

/**
 * Main Decision type representing a game decision point
 */
export interface Decision {
  // Core fields (required)
  id: string // Unique identifier (e.g., "nautiloid_start")
  type: 'decision' | 'outcome' // Usually "decision" (or "outcome" for end states)
  category: string // Category for sidebar grouping
  label: string // Short display name
  description: string // Full description of the situation
  options: DecisionOptions // Object of possible choices
  // Optional fields
  prerequisites?: string[] // Decisions that must be completed first
  unlocks?: string[] // Decisions this unlocks
  mutuallyExclusive?: string[] // Decisions that become unavailable
  required?: boolean // Is this required for progression?
  requiredPartyMembers?: PlayableCharacterType[] // Required party members
  wikiLink?: string // Optional link to a wiki page for more information
}

export type DecisionTemplate = Decision

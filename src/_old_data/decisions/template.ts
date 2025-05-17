/**
 * Decision Template
 *
 * This is a template for creating new decision files.
 * Copy this file and fill in the values for your specific decision.
 */

import type { Decision } from '@/types/decisions'

export const decisionTemplate: Decision = {
  // Core fields (required)
  id: 'unique_decision_id', // Unique identifier (e.g., "nautiloid_start")
  type: 'decision', // Usually "decision" (or "outcome" for end states)
  category: 'Act X - Location', // Category for sidebar grouping
  label: 'Decision Name', // Short display name
  description: 'Detailed description...', // Full description of the situation
  options: {
    // Array of possible choices
    1: {
      text: 'Option 1 Text', // Text for the option
      required_party_members: ['member_id_1', 'member_id_2'], // Required party members
    },
    2: {
      text: 'Option 2 Text', // Text for the option
      required_party_members: ['member_id_3'], // Required party members
    },
    3: {
      text: 'Option 3 Text', // Text for the option
    },
  },
  prerequisites: ['prerequisite_id'], // Decisions that must be completed first
  unlocks: ['unlocked_id_1', 'unlocked_id_2'], // Decisions this unlocks
  mutuallyExclusive: [], // Decisions that become unavailable
  required: true, // Is this required for progression? (true/false)
  requiredPartyMembers: ['member_id_1', 'member_id_2'], // Required party members
}

export default decisionTemplate

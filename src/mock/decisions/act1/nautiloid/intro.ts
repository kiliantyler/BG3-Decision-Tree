import { DecisionType } from '@/types/decision'

// This adds mock data for testing "Unavailable" badges
export const introDecision = {
  id: 'nautiloid_intro',
  act: 'act1',
  type: DecisionType.DECISION,
  description: 'Wake up on the Nautiloid',
  options: [
    { text: 'Stay unconscious' },
    { text: 'Wake up' },
  ],
  required: true,
}

// Create another decision with prerequisites
export const doorDecision = {
  id: 'nautiloid_door',
  act: 'act1',
  type: DecisionType.DECISION,
  description: 'Open the cell door',
  options: [
    { text: 'Break the door' },
    { text: 'Find another way' },
  ],
  required: false,
  prerequisites: [{ id: 'nautiloid_intro' }], // This makes it dependent on introDecision
}

// Create a decision with mutually exclusive option
export const podDecision = {
  id: 'nautiloid_pod',
  act: 'act1',
  type: DecisionType.DECISION,
  description: 'Interact with mind flayer pod',
  options: [
    { text: 'Free the captive' },
    { text: 'Leave it alone' },
  ],
  required: false,
  mutuallyExclusive: [{ id: 'nautiloid_door' }], // This makes it mutually exclusive with doorDecision
}

export default {
  intro: introDecision,
  door: doorDecision,
  pod: podDecision,
}

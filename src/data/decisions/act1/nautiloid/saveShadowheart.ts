import { createDecision } from '../../types'
import { ChooseCharacter } from './chooseCharacter'

// Define the option entries with option objects - this is the single source of truth
const optionEntries = {
  OpenPod: {
    name: 'Open Pod',
  },
  LeavePod: {
    name: 'Leave Pod',
  },
} as const

// Export the decision with dependencies directly
export const SaveShadowheart = createDecision(
  {
    name: 'Open The Mindflayer Pod',
    description: 'Open the pod to save Shadowheart.',
    // Add dependency directly - this decision is not available if Shadowheart was chosen as character
    dependencies: [
      {
        decision: ChooseCharacter,
        option: ChooseCharacter.Shadowheart,
        type: 'excludes',
      },
    ],
  },
  optionEntries,
)

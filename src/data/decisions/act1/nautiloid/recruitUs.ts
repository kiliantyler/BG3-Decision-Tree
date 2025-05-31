import { createDecision } from '../../types'
import { SaveShadowheart } from './saveShadowheart'

const optionEntries = {
  SaveUs: {
    name: 'Save Us',
  },
  KillUs: {
    name: 'Kill Us',
  },
  SnuggleUs: {
    name: 'Snuggle Us',
    // This option requires that we saved Shadowheart
    dependencies: [
      {
        decision: SaveShadowheart,
        option: SaveShadowheart.OpenPod,
        type: 'requires',
      },
    ],
  },
} as const

export const RecruitUs = createDecision(
  {
    name: 'Recruit Us',
    description: 'Decide whether to recruit or kill the mind flayer captives',
  },
  optionEntries,
  'RecruitUs', // Explicit ID for dependency references
)

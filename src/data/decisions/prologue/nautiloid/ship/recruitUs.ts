import { createDecision } from '@types'

const optionEntries = {
  SaveUs: {
    name: 'Save Us',
  },
  KillUs: {
    name: 'Kill Us',
  },
} as const

export const RecruitUs = createDecision(
  {
    name: 'Recruit Us',
    description: 'Decide whether to recruit or kill the mind flayer captives',
  },
  optionEntries,
)

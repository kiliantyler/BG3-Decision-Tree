import { createDecision } from '../../types'

const optionEntries = {
  Tav: {
    name: 'Tav',
  },
  Laezel: {
    name: "Lae'zel",
  },
  Shadowheart: {
    name: 'Shadowheart',
  },
} as const

export const ChooseCharacter = createDecision(
  {
    name: 'Choose Character',
    description: 'Choose which character you want to play as',
  },
  optionEntries,
)

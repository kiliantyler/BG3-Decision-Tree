import { createDecision } from '@types'

// Initial decision, this is the first decision the player makes in the game
// This does not display like other decisions on the flowchart

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
  Astarion: {
    name: 'Astarion',
  },
  Gale: {
    name: 'Gale',
  },
  Wyll: {
    name: 'Wyll',
  },
  Karlach: {
    name: 'Karlach',
  },
  DarkUrge: {
    name: 'The Dark Urge',
  },
} as const

export const ChooseCharacter = createDecision(
  {
    name: 'Choose Character',
    description: 'Choose which character you want to play as',
  },
  optionEntries,
)

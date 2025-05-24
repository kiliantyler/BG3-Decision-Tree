import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const astralKeysOptions: DecisionOption[] = [
  { text: 'Use the keys to open the celestial gate' },
  { text: 'Destroy the keys' },
  { text: 'Hide the keys in different planes' },
]

export const AstralKeys: Decision = {
  id: 'astralplane3_keys',
  act: Act.III,
  description: 'Find the Astral Keys',
  type: DecisionType.DECISION,
  options: astralKeysOptions,
  required: true,
}

const elderBrainOptions: DecisionOption[] = [
  { text: 'Destroy the Elder Brain' },
  { text: 'Bargain with the Elder Brain' },
  { text: 'Sever its connection to the colony' },
]

export const ElderBrain: Decision = {
  id: 'astralplane3_elder_brain',
  act: Act.III,
  description: 'Confront the Elder Brain',
  type: DecisionType.DECISION,
  options: elderBrainOptions,
}

const planeshiftOptions: DecisionOption[] = [
  { text: 'Return to the Material Plane' },
  { text: 'Travel to a different plane' },
  { text: 'Stay in the Astral Plane' },
]

export const Planeshift: Decision = {
  id: 'astralplane3_planeshift',
  act: Act.III,
  description: 'Use the Planeshift ritual',
  type: DecisionType.DECISION,
  options: planeshiftOptions,
  required: true,
}

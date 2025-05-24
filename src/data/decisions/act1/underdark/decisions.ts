import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const myconidColonyOptions: DecisionOption[] = [
  { text: 'Help Glut and the Myconids' },
  { text: 'Ally with the Duergar' },
  { text: 'Remain neutral in their conflict' },
]

export const MyconidColony: Decision = {
  id: 'underdark_myconid_colony',
  act: Act.I,
  description: 'Resolve the conflict at the Myconid Colony',
  type: DecisionType.DECISION,
  options: myconidColonyOptions,
}

const buletteLairOptions: DecisionOption[] = [
  { text: 'Confront the Bulette head-on' },
  { text: 'Sneak around its territory' },
  { text: 'Set a trap for the beast' },
]

export const BuletteLair: Decision = {
  id: 'underdark_bulette_lair',
  act: Act.I,
  description: "Navigate the Bulette's lair",
  type: DecisionType.DECISION,
  options: buletteLairOptions,
}

const deepDuergarsOptions: DecisionOption[] = [
  { text: 'Infiltrate the Duergar fortress' },
  { text: 'Attack them directly' },
  { text: 'Find another path' },
]

export const DeepDuergars: Decision = {
  id: 'underdark_deep_duergars',
  act: Act.I,
  description: 'Deal with the Duergar stronghold',
  type: DecisionType.DECISION,
  options: deepDuergarsOptions,
  required: true,
}

const sussurCaveOptions: DecisionOption[] = [
  { text: 'Use the sussur bloom' },
  { text: 'Leave the bloom intact' },
  { text: 'Destroy the magical bloom' },
]

export const SussurCave: Decision = {
  id: 'underdark_sussur_cave',
  act: Act.I,
  description: 'Discover the Sussur Cave',
  type: DecisionType.DECISION,
  options: sussurCaveOptions,
}

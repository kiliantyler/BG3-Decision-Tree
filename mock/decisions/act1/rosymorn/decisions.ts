import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const monasteryEntranceOptions: DecisionOption[] = [
  { text: 'Break in through the front gate' },
  { text: 'Find a secret entrance' },
  { text: 'Climb the walls' },
]

export const MonasteryEntrance: Decision = {
  id: 'rosymorn_monastery_entrance',
  act: Act.I,
  description: 'Enter Rosymorn Monastery',
  type: DecisionType.DECISION,
  options: monasteryEntranceOptions,
}

const ancientCellsOptions: DecisionOption[] = [
  { text: 'Free the prisoner' },
  { text: 'Leave them locked up' },
  { text: 'Interrogate them first' },
]

export const AncientCells: Decision = {
  id: 'rosymorn_ancient_cells',
  act: Act.I,
  description: 'Discover the ancient cells',
  type: DecisionType.DECISION,
  options: ancientCellsOptions,
}

const sacredScrollsOptions: DecisionOption[] = [
  { text: 'Take the scrolls' },
  { text: 'Leave them undisturbed' },
  { text: 'Study them without removing them' },
]

export const SacredScrolls: Decision = {
  id: 'rosymorn_sacred_scrolls',
  act: Act.I,
  description: 'Find the sacred scrolls',
  type: DecisionType.DECISION,
  options: sacredScrollsOptions,
  required: true,
}

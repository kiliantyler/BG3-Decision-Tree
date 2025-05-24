import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const druidGroveOptions: DecisionOption[] = [
  { text: 'Help the druids' },
  { text: 'Side with Minthara and the goblins' },
  { text: 'Find a diplomatic resolution' },
]

export const DruidGroveConflict: Decision = {
  id: 'wilderness_druid_conflict',
  act: Act.I,
  description: 'Resolve the conflict at the Druid Grove',
  type: DecisionType.DECISION,
  options: druidGroveOptions,
  required: true,
}

const goblinCampOptions: DecisionOption[] = [
  { text: 'Infiltrate peacefully' },
  { text: 'Attack the goblins' },
  { text: 'Make a deal with Minthara' },
]

export const GoblinCamp: Decision = {
  id: 'wilderness_goblin_camp',
  act: Act.I,
  description: 'Deal with the Goblin Camp',
  type: DecisionType.DECISION,
  options: goblinCampOptions,
}

const owlbearCubOptions: DecisionOption[] = [
  { text: 'Adopt the owlbear cub' },
  { text: 'Leave it in the wild' },
  { text: 'Give it to the druids' },
]

export const OwlbearCub: Decision = {
  id: 'wilderness_owlbear_cub',
  act: Act.I,
  description: 'Decide the fate of the owlbear cub',
  type: DecisionType.DECISION,
  options: owlbearCubOptions,
}

const blightedVillageOptions: DecisionOption[] = [
  { text: 'Investigate thoroughly' },
  { text: 'Avoid the infected areas' },
  { text: 'Use fire to cleanse the village' },
]

export const BlightedVillage: Decision = {
  id: 'wilderness_blighted_village',
  act: Act.I,
  description: 'Explore the Blighted Village',
  type: DecisionType.DECISION,
  options: blightedVillageOptions,
}

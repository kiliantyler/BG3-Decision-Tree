import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'
import { GoblinCamp, OwlbearCub } from './decisions'

// Define some options for a decision that has prerequisites
const hiddenCampOptions: DecisionOption[] = [
  { text: 'Investigate the abandoned camp' },
  { text: 'Leave it alone' },
  { text: 'Set up an ambush' },
]

// Decision that requires another decision as prerequisite
export const HiddenCamp: Decision = {
  id: 'wilderness_hidden_camp',
  act: Act.I,
  description: 'Discover the hidden bandit camp',
  type: DecisionType.DECISION,
  options: hiddenCampOptions,
  prerequisites: [GoblinCamp], // This decision requires GoblinCamp to be completed first
}

// Define options for a decision that is mutually exclusive with others
const rescueAdventurerOptions: DecisionOption[] = [
  { text: 'Help the trapped adventurer' },
  { text: 'Leave them to their fate' },
  { text: 'Negotiate a reward first' },
]

// Decision that becomes unavailable if another decision is made
export const RescueAdventurer: Decision = {
  id: 'wilderness_rescue_adventurer',
  act: Act.I,
  description: 'Rescue the trapped adventurer',
  type: DecisionType.DECISION,
  options: rescueAdventurerOptions,
  mutuallyExclusive: [OwlbearCub], // This decision becomes unavailable if OwlbearCub is completed
}

// Decision that has both prerequisites and mutual exclusivity
const ancientRuinsOptions: DecisionOption[] = [
  { text: 'Study the ancient writings' },
  { text: 'Search for hidden treasures' },
  { text: 'Perform ritual at the altar' },
]

export const AncientRuins: Decision = {
  id: 'wilderness_ancient_ruins',
  act: Act.I,
  description: 'Explore the ancient ruins',
  type: DecisionType.DECISION,
  options: ancientRuinsOptions,
  prerequisites: [GoblinCamp], // Requires GoblinCamp to be completed first
  mutuallyExclusive: [RescueAdventurer], // Cannot be completed if RescueAdventurer is done
}

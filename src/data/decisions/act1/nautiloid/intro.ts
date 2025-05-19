import { Act } from '@/data/acts'
import { type Decision, type DecisionOption, DecisionType } from '@/types'

const option1: DecisionOption = {
  text: 'The Nautiloid intro',
  required_party_members: [],
  mutuallyExclusive: [],
}

export const Intro: Decision = {
  id: 'nautiloid_intro',
  act: Act.I,
  description: 'The Nautiloid intro',
  type: DecisionType.DECISION,
  options: {
    option1,
  },
}

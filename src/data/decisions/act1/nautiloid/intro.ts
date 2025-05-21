import { Act } from '@/data/acts'
import { type Decision, type DecisionOption, DecisionType } from '@/types'

const options: DecisionOption[] = [
  {
    text: 'Intro 1',
  },
  {
    text: 'Intro 2',
  },
  {
    text: 'Intro 3',
  },
]

export const Intro: Decision = {
  id: 'nautiloid_intro',
  act: Act.I,
  description: 'The Nautiloid Intro',
  type: DecisionType.DECISION,
  options: options,
}

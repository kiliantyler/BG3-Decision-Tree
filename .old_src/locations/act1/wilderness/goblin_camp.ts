import { Act } from '@/data/acts'
import type { Location } from '@/types'
import { Wilderness } from './wilderness'

export const GoblinCamp: Location = {
  id: 'goblincamp',
  name: 'Goblin Camp',
  act: Act.I,
  region: Wilderness,
}

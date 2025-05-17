import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Wilderness } from './wilderness'

export const Forest: Location = {
  id: 'forest',
  name: 'Forest',
  act: Act.I,
  region: Wilderness,
}

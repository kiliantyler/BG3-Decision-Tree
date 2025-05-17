import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Wilderness } from './wilderness'

export const RavagedBeach: Location = {
  id: 'ravagedbeach',
  name: 'Ravaged Beach',
  act: Act.I,
  region: Wilderness,
}

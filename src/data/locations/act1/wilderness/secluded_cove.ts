import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Wilderness } from './wilderness'

export const SecludedCove: Location = {
  id: 'secludedcove',
  name: 'Secluded Cove',
  act: Act.I,
  region: Wilderness,
}

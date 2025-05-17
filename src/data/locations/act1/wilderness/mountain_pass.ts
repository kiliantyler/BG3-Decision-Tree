import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Wilderness } from './wilderness'

export const MountainPass: Location = {
  id: 'mountainpass',
  name: 'Mountain Pass',
  act: Act.I,
  region: Wilderness,
}

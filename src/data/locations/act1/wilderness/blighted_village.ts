import { Act } from '@/data/acts'
import type { Location } from '@/types'
import { Wilderness } from './wilderness'

export const BlightedVillage: Location = {
  id: 'blighted_village',
  name: 'Blighted Village',
  act: Act.I,
  region: Wilderness,
}

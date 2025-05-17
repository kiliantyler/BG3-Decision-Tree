import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Wilderness } from './wilderness'

export const EmeraldGrove: Location = {
  id: 'emeraldgrove',
  name: 'Emerald Grove',
  act: Act.I,
  region: Wilderness,
}

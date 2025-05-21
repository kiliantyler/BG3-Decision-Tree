import { Act } from '@/data/acts'
import type { Location } from '@/types'
import { Wilderness } from '.'

export const WildernessLoc: Location = {
  id: 'wilderness_loc',
  name: 'Wilderness',
  act: Act.I,
  region: Wilderness,
}

import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Wilderness } from './wilderness'

export const OvergrownRuins: Location = {
  id: 'overgrownruins',
  name: 'Overgrown Ruins',
  act: Act.I,
  region: Wilderness,
}

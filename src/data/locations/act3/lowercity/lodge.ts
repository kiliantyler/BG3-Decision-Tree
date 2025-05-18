import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { LowerCity } from '.'

export const Lodge: Location = {
  id: 'lodge',
  name: 'The Lodge',
  act: Act.III,
  region: LowerCity,
}

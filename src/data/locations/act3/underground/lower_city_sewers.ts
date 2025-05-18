import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Underground } from '.'

export const LowerCitySewers: Location = {
  id: 'lower_city_sewers',
  name: 'Lower City Sewers',
  act: Act.III,
  region: Underground,
}

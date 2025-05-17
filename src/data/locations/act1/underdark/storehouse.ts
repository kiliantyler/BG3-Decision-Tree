import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Underdark } from '.'

export const Storehouse: Location = {
  id: 'storehouse',
  name: 'Storehouse',
  act: Act.I,
  region: Underdark,
}

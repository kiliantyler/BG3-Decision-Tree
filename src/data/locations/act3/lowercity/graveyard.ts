import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { LowerCity } from '.'

export const Graveyard: Location = {
  id: 'graveyard',
  name: 'Graveyard',
  act: Act.III,
  region: LowerCity,
}

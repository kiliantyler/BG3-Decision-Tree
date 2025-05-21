import { Act } from '@/data/acts'
import type { Location } from '@/types'
import { createLocation } from '@/utils/location'
import { Nautiloid } from '.'

export const NautiloidLoc: Location = createLocation({
  id: 'nautoloid_loc',
  name: 'Nautoloid',
  act: Act.I,
  region: Nautiloid,
})

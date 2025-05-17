import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { NautiloidLoc } from '.'

export const Nautiloid: Region = {
  id: 'nautoloid',
  name: 'Nautoloid',
  act: Act.I,
  sublocations: [NautiloidLoc],
}

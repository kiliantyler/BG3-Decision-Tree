import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { UpperCityLoc } from '.'

export const UpperCity: Region = {
  id: 'uppercity',
  name: 'Upper City',
  act: Act.III,
  sublocations: [UpperCityLoc],
}

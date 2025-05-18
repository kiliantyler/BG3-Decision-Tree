import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { HouseOfHopeLoc } from '.'

export const HouseOfHope: Region = {
  id: 'houseofhope',
  name: 'House of Hope',
  act: Act.III,
  sublocations: [HouseOfHopeLoc],
}

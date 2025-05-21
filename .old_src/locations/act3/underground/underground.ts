import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { LowerCitySewers, UndercityRuins, UndergroundLoc } from '.'

export const Underground: Region = {
  id: 'underground',
  name: 'Underground',
  act: Act.III,
  sublocations: [UndergroundLoc, LowerCitySewers, UndercityRuins],
}

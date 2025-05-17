import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Wilderness } from './wilderness'

export const WaukeensRest: Location = {
  id: 'waukeensrest',
  name: "Waukeen's Rest",
  act: Act.I,
  region: Wilderness,
}

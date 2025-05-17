import { Act } from '@/data/acts'
import type { Location } from '@/types/location'
import { Wilderness } from './wilderness'

export const SunlitWetlands: Location = {
  id: 'sunlitwetlands',
  name: 'Sunlit Wetlands',
  act: Act.I,
  region: Wilderness,
}

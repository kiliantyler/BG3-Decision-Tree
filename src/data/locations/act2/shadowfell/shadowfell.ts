import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { ShadowfellLoc } from '.'

export const Shadowfell: Region = {
  id: 'shadowfell',
  name: 'Shadowfell',
  act: Act.II,
  sublocations: [ShadowfellLoc],
}

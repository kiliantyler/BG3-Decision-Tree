import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { ShadowCursedLandsLoc } from '.'

export const ShadowCursedLands: Region = {
  id: 'shadowcursedlands',
  name: 'Shadow-Cursed Lands',
  act: Act.II,
  sublocations: [ShadowCursedLandsLoc],
}

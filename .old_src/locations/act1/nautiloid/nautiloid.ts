import { Act } from '@/data/acts'
import type { Region } from '@/types'
import { createRegion } from '@/utils/region'

export const Nautiloid: Region = createRegion({
  id: 'nautoloid',
  name: 'Nautoloid',
  act: Act.I,
})

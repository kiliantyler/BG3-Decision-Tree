import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { CrecheYllek, RosymornMonastery, RosymornMonasteryTrail } from '.'

export const RosymornMT: Region = {
  id: 'rosymorn',
  name: 'Rosymorn Monastery Trail',
  act: Act.I,
  sublocations: [RosymornMonastery, RosymornMonasteryTrail, CrecheYllek],
}

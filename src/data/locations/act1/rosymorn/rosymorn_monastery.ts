import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { CrecheYllek, RosymornMonasteryLoc, RosymornMonasteryTrail } from '.'

export const RosymornMonastery: Region = {
  id: 'rosymorn',
  name: 'Rosymorn Monastery Trail',
  act: Act.I,
  sublocations: [RosymornMonasteryLoc, RosymornMonasteryTrail, CrecheYllek],
}

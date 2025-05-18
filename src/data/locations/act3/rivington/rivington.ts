import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { ArfursMansion } from './arfurs_mansion'
import { Circus } from './circus'
import { OpenHandTemple } from './open_hand_temple'
import { RequisitionedBarn } from './requisitioned_barn'
import { RivingtonGeneral } from './rivington_general'
import { RivingtonLoc } from './rivington_loc'
import { SouthSpan } from './southspan'
import { SwordCoast } from './swordcoast'

export const Rivington: Region = {
  id: 'rivington',
  name: 'Rivington',
  act: Act.III,
  sublocations: [
    ArfursMansion,
    Circus,
    OpenHandTemple,
    RequisitionedBarn,
    RivingtonGeneral,
    RivingtonLoc,
    SouthSpan,
    SwordCoast,
  ],
}

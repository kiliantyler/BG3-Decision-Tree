import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import { AstralPlaneAct3Loc } from '.'

export const AstralPlaneAct3: Region = {
  id: 'astralplane_act3',
  name: 'Astral Plane',
  act: Act.III,
  sublocations: [AstralPlaneAct3Loc],
}

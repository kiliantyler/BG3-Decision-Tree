import { Act } from '@/data/acts'
import type { Region } from '@/types'
import { AstralPlaneAct1Loc } from '.'

export const AstralPlaneAct1: Region = {
  id: 'astralplane_act1',
  name: 'Astral Plane',
  act: Act.I,
  sublocations: [AstralPlaneAct1Loc],
}

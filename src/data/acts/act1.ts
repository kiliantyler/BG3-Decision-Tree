import type { Act } from '@/types/act'
import { AstralPlaneAct1, Nautiloid, RosymornMonastery, Underdark, Wilderness } from '../locations'

export const Act1: Act = {
  id: 'act1',
  name: 'Act 1',
  regions: [AstralPlaneAct1, Nautiloid, RosymornMonastery, Underdark, Wilderness],
}

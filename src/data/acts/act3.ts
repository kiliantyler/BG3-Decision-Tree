import type { Act } from '@/types'
import {
  AstralPlaneAct3,
  HouseOfHope,
  LowerCity,
  Rivington,
  Underground,
  UpperCity,
  WyrmsCrossing,
} from '../locations'

export const Act3: Act = {
  id: 'act3',
  name: 'Act 3',
  regions: [
    AstralPlaneAct3,
    HouseOfHope,
    LowerCity,
    Rivington,
    Underground,
    UpperCity,
    WyrmsCrossing,
  ],
}

import type { Location } from '@/types/location'
import {
  BlightedVillage,
  Forest,
  RavagedBeach,
  RisenRoad,
  SecludedCove,
  SunlitWetlands,
  WaukeensRest,
} from '.'

export const Wilderness: Location = {
  id: 'wilderness',
  name: 'Wilderness',
  sublocations: [
    RisenRoad,
    SunlitWetlands,
    WaukeensRest,
    BlightedVillage,
    Forest,
    RavagedBeach,
    SecludedCove,
  ],
}

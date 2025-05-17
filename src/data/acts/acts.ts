import { Act1 } from './act1'
import { Act2 } from './act2'
import { Act3 } from './act3'

export const Act = {
  I: Act1,
  II: Act2,
  III: Act3,
}

export type Act = (typeof Act)[keyof typeof Act]

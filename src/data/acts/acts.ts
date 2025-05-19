import { Act1, Act2, Act3 } from '.'

export const Act = {
  I: Act1,
  II: Act2,
  III: Act3,
}

export type ActType = (typeof Act)[keyof typeof Act]

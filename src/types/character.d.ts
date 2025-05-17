import type { ID } from './id'

export enum CharacterType {
  PLAYABLE = 'playable',
  HIRELING = 'hireling',
  NPC = 'npc',
  CAMPFOLLOWER = 'camp_follower',
  PET = 'pet',
}

export type Character = {
  id: ID
  name: string
  type: CharacterType
  description?: string
}

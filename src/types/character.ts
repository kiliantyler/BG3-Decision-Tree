export enum CharacterType {
  PLAYABLE = 'playable',
  HIRELING = 'hireling',
  NPC = 'npc',
  CAMPFOLLOWER = 'camp_follower',
  PET = 'pet',
}

export type Character = {
  id: string
  name: string
  type: CharacterType
  description?: string
  avatarUrl?: string
  wikiUrl?: string
  // TODO Make wiki URL required
}

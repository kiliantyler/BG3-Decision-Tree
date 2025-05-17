/**
 * @file characters.d.ts
 * @description Type definitions for character data in the game.
 */

export type Character = {
  id: string
  name: string
  type: 'playable' | 'hireling' | 'npc' | 'camp_follower' | 'pet'
  portrait?: string
  description?: string
}

export type PlayableCharacterType = PartyCharacter

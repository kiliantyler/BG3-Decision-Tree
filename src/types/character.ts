import type { ReactNode } from 'react'
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
  avatarUrl?: string
}

export interface CharacterProps {
  character: Character
  isSelected?: boolean
  isDisabled?: boolean
  className?: string
  children?: ReactNode
  onClick?: (character: Character) => void
}

export interface CharacterSelectionProps {
  characters: Character[]
  selectedCharacters: Character[]
  maxSelectable?: number
  onChange: (selected: Character[]) => void
  className?: string
}

export interface CharacterContextValue {
  party: Character[]
  addCharacter: (character: Character) => void
  removeCharacter: (characterId: ID) => void
  isInParty: (characterId: ID) => boolean
}

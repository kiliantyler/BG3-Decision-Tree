import type { ReactNode } from 'react'
import type { Region } from '.'
import type { ID } from './id'

export interface Act {
  id: ID
  name: string
  regions: Region[]
}

export interface ActProps {
  act: Act
  className?: string
  children?: ReactNode
  onSelect?: (actId: ID) => void
}

export interface ActContextValue {
  currentAct: Act | null
  setCurrentAct: (act: Act) => void
}

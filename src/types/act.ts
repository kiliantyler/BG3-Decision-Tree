import type { Region } from './region'

// Act - contains regions
export interface ActType {
  name: string
  description: string
  wikiUrl: string

  [key: string]: Region | string | undefined // For both metadata and regions
}

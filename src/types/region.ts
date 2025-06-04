import type { Location } from './location'

// Region - contains locations
export interface Region {
  name: string
  description: string
  wikiUrl: string

  [key: string]: Location | string
}

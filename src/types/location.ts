import type { Decision } from './decision'

// Location - contains decisions
export interface Location {
  name: string
  description: string
  wikiUrl: string

  [key: string]: Decision<any> | string | undefined // For both metadata and decisions
}

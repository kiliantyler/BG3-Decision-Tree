import { ReactNode } from 'react'

/**
 * ID type that is forced to be lowercase with no spaces or special characters.
 * Only allows lowercase letters (a-z), numbers (0-9), and hyphens/underscores.
 *
 * This will create TypeScript errors in the editor if a string doesn't conform to these rules.
 */

// Define the allowed characters for our ID type
type LowercaseChar =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type AllowedChar = LowercaseChar | Digit | '-' | '_'

// ID type that only allows lowercase letters, numbers, hyphens, and underscores
export type ID = `${AllowedChar}${string}`

/**
 * React component helper types
 */

// Props for components that receive an ID
export interface WithIdProps {
  id: ID
  className?: string
  children?: ReactNode
}

// Type for components that require a unique ID selector
export type IdSelector<T> = (id: ID) => T

// Type for components with selection handling based on IDs
export interface SelectableProps {
  selectedId?: ID
  onSelectId?: (id: ID) => void
}

// Type for components with multiple selection handling
export interface MultiSelectProps {
  selectedIds: ID[]
  onSelectIds?: (ids: ID[]) => void
}

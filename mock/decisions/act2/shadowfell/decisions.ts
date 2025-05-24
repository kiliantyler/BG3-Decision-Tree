import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const shadowLordOptions: DecisionOption[] = [
  { text: 'Ally with the Shadow Lord' },
  { text: 'Challenge the Shadow Lord' },
  { text: 'Negotiate a deal' },
]

export const ShadowLord: Decision = {
  id: 'shadowfell_shadow_lord',
  act: Act.II,
  description: 'Encounter with the Shadow Lord',
  type: DecisionType.DECISION,
  options: shadowLordOptions,
  required: true,
}

const darkPortalOptions: DecisionOption[] = [
  { text: 'Enter the portal' },
  { text: 'Destroy the portal' },
  { text: 'Use the portal to travel elsewhere' },
]

export const DarkPortal: Decision = {
  id: 'shadowfell_dark_portal',
  act: Act.II,
  description: 'Find the Dark Portal',
  type: DecisionType.DECISION,
  options: darkPortalOptions,
}

const lostSpiritOptions: DecisionOption[] = [
  { text: 'Help the spirit find peace' },
  { text: 'Ignore the spirit' },
  { text: "Absorb the spirit's energy" },
]

export const LostSpirit: Decision = {
  id: 'shadowfell_lost_spirit',
  act: Act.II,
  description: 'Encounter with a lost spirit',
  type: DecisionType.DECISION,
  options: lostSpiritOptions,
}

const shadowNexusOptions: DecisionOption[] = [
  { text: 'Disrupt the nexus' },
  { text: 'Strengthen the nexus' },
  { text: 'Study the nexus' },
]

export const ShadowNexus: Decision = {
  id: 'shadowfell_shadow_nexus',
  act: Act.II,
  description: 'Discover the Shadow Nexus',
  type: DecisionType.DECISION,
  options: shadowNexusOptions,
  required: true,
}

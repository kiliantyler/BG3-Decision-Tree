import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const undergroundColiseumOptions: DecisionOption[] = [
  { text: 'Participate in the fights' },
  { text: 'Sabotage the matches' },
  { text: 'Free the captive fighters' },
]

export const UndergroundColiseum: Decision = {
  id: 'underground_coliseum',
  act: Act.III,
  description: 'Discover the Underground Coliseum',
  type: DecisionType.DECISION,
  options: undergroundColiseumOptions,
  required: true,
}

const smugglersTunnelsOptions: DecisionOption[] = [
  { text: 'Map the smuggling routes' },
  { text: 'Collapse the dangerous tunnels' },
  { text: 'Set up an ambush' },
]

export const SmugglersTunnels: Decision = {
  id: 'underground_smugglers',
  act: Act.III,
  description: "Explore the Smugglers' Tunnels",
  type: DecisionType.DECISION,
  options: smugglersTunnelsOptions,
}

const forgottenShrineOptions: DecisionOption[] = [
  { text: 'Restore the shrine' },
  { text: 'Desecrate the shrine' },
  { text: 'Study the ancient carvings' },
]

export const ForgottenShrine: Decision = {
  id: 'underground_shrine',
  act: Act.III,
  description: 'Find the Forgotten Shrine',
  type: DecisionType.DECISION,
  options: forgottenShrineOptions,
}

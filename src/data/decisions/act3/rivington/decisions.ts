import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const marketplaceOptions: DecisionOption[] = [
  { text: 'Purchase exotic goods' },
  { text: 'Investigate the black market' },
  { text: 'Establish a trading post' },
]

export const Marketplace: Decision = {
  id: 'rivington_marketplace',
  act: Act.III,
  description: 'Deal with the Rivington Marketplace',
  type: DecisionType.DECISION,
  options: marketplaceOptions,
}

const refugeeCrisisOptions: DecisionOption[] = [
  { text: 'Help the refugees' },
  { text: 'Report them to authorities' },
  { text: 'Exploit their desperate situation' },
]

export const RefugeeCrisis: Decision = {
  id: 'rivington_refugee_crisis',
  act: Act.III,
  description: 'Address the refugee crisis',
  type: DecisionType.DECISION,
  options: refugeeCrisisOptions,
  required: true,
}

const forgottenTavernOptions: DecisionOption[] = [
  { text: 'Join the secret meeting' },
  { text: 'Eavesdrop on the conspirators' },
  { text: 'Report the suspicious activity' },
]

export const ForgottenTavern: Decision = {
  id: 'rivington_tavern',
  act: Act.III,
  description: 'Investigate The Forgotten Tavern',
  type: DecisionType.DECISION,
  options: forgottenTavernOptions,
}

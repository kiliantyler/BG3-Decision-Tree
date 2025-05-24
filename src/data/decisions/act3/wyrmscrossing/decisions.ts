import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const bridgeGuardsOptions: DecisionOption[] = [
  { text: 'Bribe the bridge guards' },
  { text: 'Sneak past the guards' },
  { text: 'Confront the guards directly' },
]

export const BridgeGuards: Decision = {
  id: 'wyrmscrossing_guards',
  act: Act.III,
  description: 'Deal with the bridge guards',
  type: DecisionType.DECISION,
  options: bridgeGuardsOptions,
  required: true,
}

const tollDisputeOptions: DecisionOption[] = [
  { text: 'Pay the toll' },
  { text: 'Negotiate a reduced toll' },
  { text: 'Find another way across' },
]

export const TollDispute: Decision = {
  id: 'wyrmscrossing_toll',
  act: Act.III,
  description: 'Resolve the bridge toll dispute',
  type: DecisionType.DECISION,
  options: tollDisputeOptions,
}

const bridgeSabotageOptions: DecisionOption[] = [
  { text: 'Stop the saboteurs' },
  { text: 'Join the saboteurs' },
  { text: 'Alert the authorities' },
]

export const BridgeSabotage: Decision = {
  id: 'wyrmscrossing_sabotage',
  act: Act.III,
  description: 'Uncover the bridge sabotage plot',
  type: DecisionType.DECISION,
  options: bridgeSabotageOptions,
}

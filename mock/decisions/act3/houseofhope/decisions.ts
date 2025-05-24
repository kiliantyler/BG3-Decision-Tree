import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const dealWithDevilOptions: DecisionOption[] = [
  { text: "Accept the devil's deal" },
  { text: 'Reject the offer' },
  { text: 'Negotiate better terms' },
]

export const DealWithDevil: Decision = {
  id: 'houseofhope_deal',
  act: Act.III,
  description: 'Deal with Raphael',
  type: DecisionType.DECISION,
  options: dealWithDevilOptions,
  required: true,
}

const infernalContractOptions: DecisionOption[] = [
  { text: 'Sign the contract' },
  { text: 'Find a loophole in the contract' },
  { text: 'Destroy the contract' },
]

export const InfernalContract: Decision = {
  id: 'houseofhope_contract',
  act: Act.III,
  description: 'Deal with the Infernal Contract',
  type: DecisionType.DECISION,
  options: infernalContractOptions,
}

const forbiddenLibraryOptions: DecisionOption[] = [
  { text: 'Study the forbidden texts' },
  { text: 'Steal key volumes' },
  { text: 'Burn the dangerous tomes' },
]

export const ForbiddenLibrary: Decision = {
  id: 'houseofhope_library',
  act: Act.III,
  description: 'Explore the Forbidden Library',
  type: DecisionType.DECISION,
  options: forbiddenLibraryOptions,
}

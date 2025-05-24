import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const joinTadpolesOptions: DecisionOption[] = [
  { text: 'Accept the tadpole' },
  { text: 'Reject the tadpole' },
]

export const JoinTadpoles: Decision = {
  id: 'nautiloid_join_tadpoles',
  act: Act.I,
  description: 'Accept or reject the tadpole',
  type: DecisionType.DECISION,
  options: joinTadpolesOptions,
  required: true,
}

const saveCompanionOptions: DecisionOption[] = [
  { text: 'Save Shadowheart' },
  { text: "Save Lae'zel" },
  { text: 'Save no one' },
]

export const SaveCompanion: Decision = {
  id: 'nautiloid_save_companion',
  act: Act.I,
  description: 'Choose who to save from the pods',
  type: DecisionType.DECISION,
  options: saveCompanionOptions,
}

const defenseMechanismOptions: DecisionOption[] = [
  { text: 'Use controls to activate defense systems' },
  { text: 'Ignore the controls' },
]

export const DefenseMechanism: Decision = {
  id: 'nautiloid_defense_mechanism',
  act: Act.I,
  description: 'Activate Nautiloid defense mechanisms',
  type: DecisionType.DECISION,
  options: defenseMechanismOptions,
}

import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const thiefGuildOptions: DecisionOption[] = [
  { text: 'Join the Thieves Guild' },
  { text: 'Take down the Thieves Guild' },
  { text: 'Negotiate with the Thieves Guild' },
]

export const ThievesGuild: Decision = {
  id: 'lowercity_thieves_guild',
  act: Act.III,
  description: 'Deal with the Thieves Guild',
  type: DecisionType.DECISION,
  options: thiefGuildOptions,
}

const docksSecretOptions: DecisionOption[] = [
  { text: 'Expose the smuggling operation' },
  { text: 'Blackmail the smugglers' },
  { text: 'Join the smuggling operation' },
]

export const DocksSecret: Decision = {
  id: 'lowercity_docks_secret',
  act: Act.III,
  description: 'Discover the secret at the docks',
  type: DecisionType.DECISION,
  options: docksSecretOptions,
}

const slumsRebellionOptions: DecisionOption[] = [
  { text: 'Support the rebellion' },
  { text: 'Betray the rebellion to the authorities' },
  { text: 'Remain neutral' },
]

export const SlumsRebellion: Decision = {
  id: 'lowercity_slums_rebellion',
  act: Act.III,
  description: 'Handle the rebellion in the slums',
  type: DecisionType.DECISION,
  options: slumsRebellionOptions,
  required: true,
}

import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const mindflayerPodOptions: DecisionOption[] = [
  { text: 'Connect to the hivemind' },
  { text: 'Resist the connection' },
  { text: 'Attempt to corrupt the hivemind' },
]

export const MindflayerPod: Decision = {
  id: 'astralplane_mindflayer_pod',
  act: Act.I,
  description: 'Encounter with Mindflayer pod',
  type: DecisionType.DECISION,
  options: mindflayerPodOptions,
}

const astralCrystalOptions: DecisionOption[] = [
  { text: 'Channel its energy' },
  { text: 'Destroy the crystal' },
  { text: 'Leave it untouched' },
]

export const AstralCrystal: Decision = {
  id: 'astralplane_crystal',
  act: Act.I,
  description: 'Find the Astral Crystal',
  type: DecisionType.DECISION,
  options: astralCrystalOptions,
  required: true,
}

const psychicEchoOptions: DecisionOption[] = [
  { text: 'Embrace the psychic echoes' },
  { text: 'Shield your mind' },
  { text: 'Use the echoes to locate others' },
]

export const PsychicEcho: Decision = {
  id: 'astralplane_psychic_echo',
  act: Act.I,
  description: 'Deal with psychic echoes',
  type: DecisionType.DECISION,
  options: psychicEchoOptions,
}

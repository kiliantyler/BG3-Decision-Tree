import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const nobleFactionOptions: DecisionOption[] = [
  { text: 'Support House Vanthampur' },
  { text: 'Support the Thorm family' },
  { text: 'Play both sides against each other' },
]

export const NobleFactions: Decision = {
  id: 'uppercity_noble_factions',
  act: Act.III,
  description: 'Choose sides in the noble faction dispute',
  type: DecisionType.DECISION,
  options: nobleFactionOptions,
  required: true,
}

const grandBallOptions: DecisionOption[] = [
  { text: 'Attend the ball in disguise' },
  { text: 'Crash the ball openly' },
  { text: 'Infiltrate as staff' },
]

export const GrandBall: Decision = {
  id: 'uppercity_grand_ball',
  act: Act.III,
  description: 'Infiltrate the Grand Ball',
  type: DecisionType.DECISION,
  options: grandBallOptions,
}

const imperialDecreeOptions: DecisionOption[] = [
  { text: 'Forge a new decree' },
  { text: 'Steal the original decree' },
  { text: 'Publicly expose the decree' },
]

export const ImperialDecree: Decision = {
  id: 'uppercity_imperial_decree',
  act: Act.III,
  description: 'Deal with the Imperial Decree',
  type: DecisionType.DECISION,
  options: imperialDecreeOptions,
}

const highJusticeOptions: DecisionOption[] = [
  { text: 'Bribe the High Justice' },
  { text: 'Blackmail the High Justice' },
  { text: "Appeal to the High Justice's sense of duty" },
]

export const HighJustice: Decision = {
  id: 'uppercity_high_justice',
  act: Act.III,
  description: 'Audience with the High Justice',
  type: DecisionType.DECISION,
  options: highJusticeOptions,
  required: true,
}

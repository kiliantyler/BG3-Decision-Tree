import { Act } from '@/data/acts'
import { DecisionType, type Decision, type DecisionOption } from '@/types'

const cursedLandsOptions: DecisionOption[] = [
  { text: 'Use protection spells against the curse' },
  { text: 'Embrace the curse for power' },
  { text: 'Find a way to cleanse the land' },
]

export const CursedLands: Decision = {
  id: 'shadowcursed_lands',
  act: Act.II,
  description: 'Navigate the Cursed Lands',
  type: DecisionType.DECISION,
  options: cursedLandsOptions,
  required: true,
}

const hauntedVillageOptions: DecisionOption[] = [
  { text: 'Exorcise the spirits' },
  { text: 'Communicate with the ghosts' },
  { text: 'Avoid the village entirely' },
]

export const HauntedVillage: Decision = {
  id: 'shadowcursed_haunted_village',
  act: Act.II,
  description: 'Investigate the Haunted Village',
  type: DecisionType.DECISION,
  options: hauntedVillageOptions,
}

const cursedArtifactOptions: DecisionOption[] = [
  { text: 'Take the artifact' },
  { text: 'Destroy the artifact' },
  { text: 'Leave it where it is' },
]

export const CursedArtifact: Decision = {
  id: 'shadowcursed_artifact',
  act: Act.II,
  description: 'Find the Cursed Artifact',
  type: DecisionType.DECISION,
  options: cursedArtifactOptions,
}

const shadowCultOptions: DecisionOption[] = [
  { text: 'Infiltrate the cult' },
  { text: 'Confront the cult leaders' },
  { text: 'Report the cult to authorities' },
]

export const ShadowCult: Decision = {
  id: 'shadowcursed_shadow_cult',
  act: Act.II,
  description: 'Deal with the Shadow Cult',
  type: DecisionType.DECISION,
  options: shadowCultOptions,
  required: true,
}

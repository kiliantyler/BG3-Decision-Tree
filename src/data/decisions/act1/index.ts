// Import all decisions from their respective files
import { ChooseCharacter } from './nautiloid/chooseCharacter'
import { RecruitUs } from './nautiloid/recruitUs'
import { SaveShadowheart } from './nautiloid/saveShadowheart'

// Export the Act1 object with all decisions
export const Act1 = {
  Nautiloid: {
    Nautiloid: {
      ChooseCharacter,
      SaveShadowheart,
      RecruitUs,
    },
  },
}

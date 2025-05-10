---
name: Game Data Contribution
about: Contribute new game decision data or corrections
title: '[DATA] '
labels: data
assignees: ''
---

## Data Contribution Type

- [ ] New decision data
- [ ] Correction to existing data
- [ ] Additional options for existing decision
- [ ] Other data contribution

## Game Information

- **Act**: [e.g. Act 1, Act 2, Act 3]
- **Location**: [e.g. Druid Grove, Goblin Camp, Moonrise Towers]
- **Related Quest**: [e.g. Rescue the Druid Halsin]
- **Related Characters**: [e.g. Halsin, Minthara, Shadowheart]

## Decision Data

Please provide the decision data in the following format:

```javascript
{
  id: "unique_decision_id", // Suggested ID or leave blank
  type: "decision", // Usually "decision"
  category: "Act X - Location", // e.g. "Act 1 - Druid Grove"
  label: "Decision Name", // Short name for the decision
  description: "Detailed description...", // Full description of the decision
  options: ["Option 1", "Option 2", "Option 3"], // Available choices
  prerequisites: ["prerequisite_id"], // IDs of decisions that must be made first
  unlocks: ["unlocked_id_1", "unlocked_id_2"], // IDs of decisions this unlocks
  mutuallyExclusive: [], // IDs of decisions that become unavailable
  optional: false, // Is this an optional side quest?
  required: true, // Is this required for main story progression?
  location: "Specific location", // Specific location within the area
  characters: ["Character 1", "Character 2"] // Characters involved
}
```

## Source of Information

- [ ] Personal gameplay experience
- [ ] Wiki or guide (please provide link)
- [ ] Community discussion (please provide link)
- [ ] Other (please specify)

## Additional Context

Add any other context or screenshots about the data contribution here.

## Verification

- [ ] I have verified this information in-game
- [ ] I have checked that this data is not already in the project
- [ ] I understand that this contribution will be reviewed before being added

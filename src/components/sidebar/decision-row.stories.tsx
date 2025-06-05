import { SidebarProvider } from '@/components/ui/sidebar'
import type { Decision } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import { DecisionRow } from './decision-row'
import { isDecisionUnavailable } from './helpers/decision-status'

// Create sample completed decisions for storybook demos
const getCompletedDecisionsForStories = (): Decision<any>[] => {
  // Create sample completed decisions for demo purposes
  const goblinCampDecision: Decision<any> = {
    id: 'wilderness_goblincamp_goblinleader',
    name: 'Goblin Leader Decision',
    description: 'What to do with the goblin leader',
    options: [
      { name: 'Kill the goblin leader' },
      { name: 'Spare the goblin leader' },
    ],
    dependencies: [],
  }

  const owlbearCubDecision: Decision<any> = {
    id: 'wilderness_forest_owlbearcub',
    name: 'Owlbear Cub Decision',
    description: 'What to do with the owlbear cub',
    options: [
      { name: 'Take the owlbear cub' },
      { name: 'Leave the owlbear cub' },
    ],
    dependencies: [],
  }

  return [
    goblinCampDecision,
    owlbearCubDecision,
  ]
}

// Wrap DecisionRow for story purposes to provide completed decisions
const DecisionRowWithCompletedDecisions = (
  props: React.ComponentProps<typeof DecisionRow>,
) => {
  // Mock the isDecisionUnavailable function by using our story-specific completed decisions
  const originalIsDecisionUnavailable = isDecisionUnavailable
  const modifiedIsDecisionUnavailable = (decision: Decision<any>) => {
    return originalIsDecisionUnavailable(
      decision,
      getCompletedDecisionsForStories(),
    )
  }

  // Replace the isDecisionUnavailable implementation for stories
  ;(DecisionRow as any).prototype.isDecisionUnavailable =
    modifiedIsDecisionUnavailable

  return <DecisionRow {...props} />
}

const meta: Meta<typeof DecisionRowWithCompletedDecisions> = {
  title: 'Components/Sidebar/DecisionRow',
  component: DecisionRowWithCompletedDecisions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <SidebarProvider>
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DecisionRow>

// Create sample decisions for stories
const createSampleDecision = (
  id: string,
  description: string,
  required: boolean = false,
  options: { name: string }[] = [{ name: 'Option 1' }, { name: 'Option 2' }],
): Decision<any> => ({
  id,
  name: description,
  description,
  options,
  dependencies: [],
})

export const Required: Story = {
  args: {
    decision: createSampleDecision(
      'required-decision',
      'Accept or reject the tadpole',
      true,
      [
        { name: 'Accept the tadpole' },
        { name: 'Reject the tadpole' },
      ],
    ),
  },
}

export const Optional: Story = {
  args: {
    decision: createSampleDecision(
      'optional-decision',
      'Choose who to save from the pods',
      false,
      [
        { name: 'Save Shadowheart' },
        { name: "Save Lae'zel" },
        { name: 'Save no one' },
      ],
    ),
  },
}

export const LongDescription: Story = {
  args: {
    decision: createSampleDecision(
      'long-description',
      'This is an extremely long decision description that should be truncated when displayed in the decision row component',
      true,
    ),
  },
}

export const ActTwo: Story = {
  args: {
    decision: createSampleDecision(
      'act2-decision',
      'Shadow Realm Decision',
      true,
      [
        { name: 'Enter the darkness' },
        { name: 'Find another path' },
      ],
    ),
  },
}

export const ActThree: Story = {
  args: {
    decision: createSampleDecision('act3-decision', 'City Decision', false, [
      { name: 'Upper City Path' },
      { name: 'Lower City Path' },
    ]),
  },
}

export const ManyOptions: Story = {
  args: {
    decision: createSampleDecision(
      'many-options',
      'Decision with many options',
      true,
      [
        { name: 'Option 1' },
        { name: 'Option 2' },
        { name: 'Option 3' },
        { name: 'Option 4' },
        { name: 'Option 5' },
      ],
    ),
  },
}

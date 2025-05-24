import { SidebarProvider } from '@/components/ui/sidebar'
import { Act } from '@/data/acts'
import { DecisionType } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import { DecisionRow } from './decision-row'

const meta: Meta<typeof DecisionRow> = {
  title: 'Components/Sidebar/DecisionRow',
  component: DecisionRow,
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

export const Required: Story = {
  args: {
    decision: {
      id: 'required-decision' as any,
      act: Act.I,
      description: 'Accept or reject the tadpole',
      type: DecisionType.DECISION,
      options: [
        { text: 'Accept the tadpole' },
        { text: 'Reject the tadpole' },
      ],
      required: true,
    },
  },
}

export const Optional: Story = {
  args: {
    decision: {
      id: 'optional-decision' as any,
      act: Act.I,
      description: 'Choose who to save from the pods',
      type: DecisionType.DECISION,
      options: [
        { text: 'Save Shadowheart' },
        { text: "Save Lae'zel" },
        { text: 'Save no one' },
      ],
      required: false,
    },
  },
}

export const LongDescription: Story = {
  args: {
    decision: {
      id: 'long-description' as any,
      act: Act.I,
      description:
        'This is an extremely long decision description that should be truncated when displayed in the decision row component',
      type: DecisionType.DECISION,
      options: [
        { text: 'Option 1' },
        { text: 'Option 2' },
      ],
      required: true,
    },
  },
}

export const ActTwo: Story = {
  args: {
    decision: {
      id: 'act2-decision' as any,
      act: Act.II,
      description: 'Shadow Realm Decision',
      type: DecisionType.DECISION,
      options: [
        { text: 'Enter the darkness' },
        { text: 'Find another path' },
      ],
      required: true,
    },
  },
}

export const ActThree: Story = {
  args: {
    decision: {
      id: 'act3-decision' as any,
      act: Act.III,
      description: 'City Decision',
      type: DecisionType.DECISION,
      options: [
        { text: 'Upper City Path' },
        { text: 'Lower City Path' },
      ],
      required: false,
    },
  },
}

export const ManyOptions: Story = {
  args: {
    decision: {
      id: 'many-options' as any,
      act: Act.I,
      description: 'Decision with many options',
      type: DecisionType.DECISION,
      options: [
        { text: 'Option 1' },
        { text: 'Option 2' },
        { text: 'Option 3' },
        { text: 'Option 4' },
        { text: 'Option 5' },
      ],
      required: true,
    },
  },
}

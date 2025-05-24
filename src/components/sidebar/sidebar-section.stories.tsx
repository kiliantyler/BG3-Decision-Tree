import { SidebarProvider } from '@/components/ui/sidebar'
import { Act } from '@/data/acts'
import { DecisionType } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import { SidebarSection } from './sidebar-section'

const meta: Meta<typeof SidebarSection> = {
  title: 'Components/Sidebar/SidebarSection',
  component: SidebarSection,
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
type Story = StoryObj<typeof SidebarSection>

const mockDecisions = [
  {
    id: 'decision1' as any,
    act: Act.I,
    description: 'Accept or reject the tadpole',
    type: DecisionType.DECISION,
    options: [
      { text: 'Accept the tadpole' },
      { text: 'Reject the tadpole' },
    ],
    required: true,
  },
  {
    id: 'decision2' as any,
    act: Act.I,
    description: 'Choose who to save from the pods',
    type: DecisionType.DECISION,
    options: [
      { text: 'Save Shadowheart' },
      { text: "Save Lae'zel" },
      { text: 'Save no one' },
    ],
  },
  {
    id: 'decision3' as any,
    act: Act.I,
    description: 'Activate Nautiloid defense mechanisms',
    type: DecisionType.DECISION,
    options: [
      { text: 'Use controls to activate defense systems' },
      { text: 'Ignore the controls' },
    ],
  },
]

export const Default: Story = {
  args: {
    title: 'Nautiloid',
    subtitle: '3 decisions',
    decisions: mockDecisions as any,
    badge: {
      text: '1 Required',
      variant: 'outline',
    },
    defaultOpen: true,
  },
}

export const Collapsed: Story = {
  args: {
    title: 'Nautiloid',
    subtitle: '3 decisions',
    decisions: mockDecisions as any,
    badge: {
      text: '1 Required',
      variant: 'outline',
    },
    defaultOpen: false,
  },
}

export const NoRequiredDecisions: Story = {
  args: {
    title: 'Optional Area',
    subtitle: '2 decisions',
    decisions: mockDecisions.filter(d => !d.required) as any,
    badge: {
      text: '0 Required',
      variant: 'outline',
    },
    defaultOpen: true,
  },
}

export const AllRequiredDecisions: Story = {
  args: {
    title: 'Critical Path',
    subtitle: '2 decisions',
    decisions: mockDecisions
      .map(d => ({ ...d, required: true }))
      .slice(0, 2) as any,
    badge: {
      text: '2 Required',
      variant: 'outline',
    },
    defaultOpen: true,
  },
}

export const LongTitle: Story = {
  args: {
    title: 'Extremely Long Location Name That Should Be Truncated',
    subtitle: '3 decisions',
    decisions: mockDecisions as any,
    badge: {
      text: '1 Required',
      variant: 'outline',
    },
    defaultOpen: true,
  },
}

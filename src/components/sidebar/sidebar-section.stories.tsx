import { SidebarProvider } from '@/components/ui/sidebar'
import { Act } from '@/data/acts'
import { DecisionType } from '@/types'
// Import mock decision data for stories
import { allDecisions } from '@mock/decisions'
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

// Fallback mock decisions in case the import fails
const fallbackMockDecisions = [
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

// Get Nautiloid decisions from the mock data
const nautiloidDecisions = allDecisions.filter(
  (d: any) => d.region === 'Nautiloid',
)
const optionalDecisions = allDecisions.filter((d: any) => !d.required)
const requiredDecisions = allDecisions.filter((d: any) => d.required)

export const Default: Story = {
  args: {
    title: 'Nautiloid',
    subtitle: `${nautiloidDecisions.length || 3} decisions`,
    decisions: nautiloidDecisions.length
      ? nautiloidDecisions
      : (fallbackMockDecisions as any),
    badge: {
      text: `${nautiloidDecisions.filter((d: any) => d.required).length || 1} Required`,
      variant: 'outline',
    },
    defaultOpen: true,
  },
}

export const Collapsed: Story = {
  args: {
    title: 'Nautiloid',
    subtitle: `${nautiloidDecisions.length || 3} decisions`,
    decisions: nautiloidDecisions.length
      ? nautiloidDecisions
      : (fallbackMockDecisions as any),
    badge: {
      text: `${nautiloidDecisions.filter((d: any) => d.required).length || 1} Required`,
      variant: 'outline',
    },
    defaultOpen: false,
  },
}

export const NoRequiredDecisions: Story = {
  args: {
    title: 'Optional Area',
    subtitle: `${optionalDecisions.slice(0, 5).length} decisions`,
    decisions:
      (optionalDecisions.slice(0, 5) as any) ||
      (fallbackMockDecisions.filter(d => !d.required) as any),
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
    subtitle: `${requiredDecisions.slice(0, 3).length || 2} decisions`,
    decisions:
      (requiredDecisions.slice(0, 3) as any) ||
      (fallbackMockDecisions
        .map(d => ({ ...d, required: true }))
        .slice(0, 2) as any),
    badge: {
      text: `${requiredDecisions.slice(0, 3).length || 2} Required`,
      variant: 'outline',
    },
    defaultOpen: true,
  },
}

export const LongTitle: Story = {
  args: {
    title: 'Extremely Long Location Name That Should Be Truncated',
    subtitle: '3 decisions',
    decisions: fallbackMockDecisions as any,
    badge: {
      text: '1 Required',
      variant: 'outline',
    },
    defaultOpen: true,
  },
}

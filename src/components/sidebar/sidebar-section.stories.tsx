import { SidebarProvider } from '@/components/ui/sidebar'
import { DecisionType } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import { SidebarSection } from './sidebar-section'

// Wrap SidebarSection in SidebarProvider to fix "useSidebar must be used within a SidebarProvider" error
const SidebarSectionWithProvider = (
  props: React.ComponentProps<typeof SidebarSection>,
) => (
  <SidebarProvider>
    <SidebarSection {...props} />
  </SidebarProvider>
)

// Create mock decisions for the storybook
// We need to use 'as Decision' to bypass TypeScript's strict ID type checking in storybook
const mockDecisions = [
  {
    id: 'story_required_decision',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    description: 'Required decision',
    type: DecisionType.DECISION,
    options: [{ text: 'Option 1' }, { text: 'Option 2' }],
    required: true,
  },
  {
    id: 'story_optional_decision',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    description: 'Optional decision',
    type: DecisionType.DECISION,
    options: [{ text: 'Option 1' }, { text: 'Option 2' }],
    required: false,
  },
  {
    id: 'story_unavailable_decision',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    description: 'Unavailable decision with prerequisite',
    type: DecisionType.DECISION,
    options: [{ text: 'Option 1' }, { text: 'Option 2' }],
    required: false,
    prerequisites: [
      {
        id: 'story_prerequisite_decision',
        act: { id: 'act1', name: 'Act 1', regions: [] },
        type: DecisionType.DECISION,
        description: 'Prerequisite',
        options: [],
      },
    ],
  },
] as any // Type assertion to avoid ID format issues in storybook

const meta: Meta<typeof SidebarSectionWithProvider> = {
  title: 'Sidebar/SidebarSection',
  component: SidebarSectionWithProvider,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Region Name',
    subtitle: '3 decisions (1 required)',
    decisions: mockDecisions,
    badge: {
      text: '1 Required',
      variant: 'outline',
    },
    defaultOpen: true,
    showRequired: true,
    showOptional: true,
    showUnavailable: true,
    searchTerm: '',
  },
  argTypes: {
    defaultOpen: { control: 'boolean' },
    showRequired: { control: 'boolean' },
    showOptional: { control: 'boolean' },
    showUnavailable: { control: 'boolean' },
    searchTerm: { control: 'text' },
  },
  decorators: [
    Story => (
      <div className="w-[350px] bg-background">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SidebarSectionWithProvider>

export const Default: Story = {}

export const Collapsed: Story = {
  args: {
    defaultOpen: false,
  },
}

export const WithCustomBadge: Story = {
  args: {
    badge: {
      text: 'New',
      variant: 'default',
    },
  },
}

export const FilteredBySearch: Story = {
  args: {
    searchTerm: 'unavailable',
  },
}

export const FilteredByType: Story = {
  args: {
    showRequired: true,
    showOptional: false,
    showUnavailable: false,
  },
}

export const WithExternalControl: Story = {
  args: {
    isOpenExternal: true,
    onOpenChangeExternal: () => {},
  },
}

export const EmptySection: Story = {
  args: {
    decisions: [],
    subtitle: 'No decisions available',
  },
}

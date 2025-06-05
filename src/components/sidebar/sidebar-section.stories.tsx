import { SidebarProvider } from '@/components/ui/sidebar'
import type { Decision } from '@/types'
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

// Create story decisions using the proper Decision type
const createStoryDecision = (
  id: string,
  description: string,
  required: boolean = false,
  options: { name: string }[] = [{ name: 'Option 1' }, { name: 'Option 2' }],
  dependencies?: any[],
): Decision<any> => ({
  id,
  name: description,
  description,
  options,
  dependencies,
})

// Create sample decisions for the storybook
const storyDecisions = [
  createStoryDecision('story_required_decision', 'Required decision', true),
  createStoryDecision('story_optional_decision', 'Optional decision', false),
  createStoryDecision(
    'story_unavailable_decision',
    'Unavailable decision with prerequisite',
    false,
    [{ name: 'Option 1' }, { name: 'Option 2' }],
    [
      {
        decision: createStoryDecision(
          'story_prerequisite_decision',
          'Prerequisite',
        ),
        option: { name: 'Option 1' },
        type: 'requires',
      },
    ],
  ),
]

const meta: Meta<typeof SidebarSectionWithProvider> = {
  title: 'Sidebar/SidebarSection',
  component: SidebarSectionWithProvider,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Region Name',
    subtitle: '3 decisions (1 required)',
    decisions: storyDecisions,
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

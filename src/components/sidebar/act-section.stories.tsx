import { SidebarProvider } from '@/components/ui/sidebar'
import type { Decision } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import { ActSection } from './act-section'

// Wrap ActSection in SidebarProvider to fix "useSidebar must be used within a SidebarProvider" error
const ActSectionWithProvider = (
  props: React.ComponentProps<typeof ActSection>,
) => (
  <SidebarProvider>
    <ActSection {...props} />
  </SidebarProvider>
)

// Define story data for the component with proper TypeScript types
const storyAct = {
  id: 'act1',
  name: 'Act 1',
}

// Create decision using proper Decision type
const createStoryDecision = (
  id: string,
  description: string,
  isRequired: boolean,
  options: { name: string }[] = [{ name: 'Option 1' }, { name: 'Option 2' }],
  dependencies?: any[],
): Decision<any> => ({
  id,
  name: description,
  description,
  options,
  dependencies,
})

const storyRegions = [
  {
    name: 'Nautiloid',
    decisions: [
      createStoryDecision(
        'story_nautiloid_decision1',
        'First decision in Nautiloid',
        true,
      ),
      createStoryDecision(
        'story_nautiloid_decision2',
        'Second decision in Nautiloid',
        false,
      ),
    ],
  },
  {
    name: 'Wilderness',
    decisions: [
      createStoryDecision(
        'story_wilderness_required',
        'Required wilderness decision',
        true,
      ),
      createStoryDecision(
        'story_wilderness_optional',
        'Optional wilderness decision',
        false,
      ),
      createStoryDecision(
        'story_wilderness_unavailable',
        'Unavailable wilderness decision',
        false,
        [{ name: 'Option 1' }, { name: 'Option 2' }],
        [
          {
            decision: createStoryDecision(
              'story_prerequisite_decision',
              'Prerequisite',
              false,
            ),
            option: { name: 'Option 1', id: 'option1' },
            type: 'requires',
          },
        ],
      ),
    ],
  },
]

// Mock functions for the section state controls
const storySectionStates = {
  'act-act1': true,
  'region-act1-Nautiloid': false,
  'region-act1-Wilderness': true,
}

const meta: Meta<typeof ActSectionWithProvider> = {
  title: 'Sidebar/ActSection',
  component: ActSectionWithProvider,
  parameters: {
    layout: 'padded',
  },
  args: {
    act: storyAct,
    regions: storyRegions,
    defaultOpen: true,
    showRequired: true,
    showOptional: true,
    showUnavailable: true,
    searchTerm: '',
    sectionStates: storySectionStates,
    isOpenExternal: true,
    onOpenChangeExternal: () => {},
  },
  argTypes: {
    defaultOpen: { control: 'boolean' },
    showRequired: { control: 'boolean' },
    showOptional: { control: 'boolean' },
    showUnavailable: { control: 'boolean' },
    searchTerm: { control: 'text' },
    isOpenExternal: { control: 'boolean' },
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
type Story = StoryObj<typeof ActSectionWithProvider>

export const Default: Story = {}

export const Collapsed: Story = {
  args: {
    defaultOpen: false,
    isOpenExternal: false,
  },
}

export const FilteredBySearch: Story = {
  args: {
    searchTerm: 'wilderness',
  },
}

export const FilteredByType: Story = {
  args: {
    showRequired: true,
    showOptional: false,
    showUnavailable: false,
  },
}

export const EmptyFiltered: Story = {
  args: {
    showRequired: false,
    showOptional: false,
    showUnavailable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When all filters exclude all decisions, the section will not be rendered at all',
      },
    },
  },
}

export const Act2Example: Story = {
  args: {
    act: {
      id: 'act2',
      name: 'Act 2',
    },
    regions: [
      {
        name: 'Shadowfell',
        decisions: [
          createStoryDecision(
            'story_shadowfell_decision',
            'Shadowfell decision',
            true,
          ),
        ],
      },
    ],
    sectionStates: {
      'act-act2': true,
      'region-act2-Shadowfell': false,
    },
  },
}

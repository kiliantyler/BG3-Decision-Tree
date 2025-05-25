import type { Meta, StoryObj } from '@storybook/react'
import { ActSection } from './act-section'

// Define mock data for the component with proper TypeScript type handling
const mockAct = {
  id: 'act1',
  name: 'Act 1',
}

const mockRegions = [
  {
    name: 'Nautiloid',
    decisions: [
      {
        id: 'story_nautiloid_decision1',
        act: { id: 'act1', name: 'Act 1', regions: [] },
        description: 'First decision in Nautiloid',
        type: 'decision',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
        required: true,
      },
      {
        id: 'story_nautiloid_decision2',
        act: { id: 'act1', name: 'Act 1', regions: [] },
        description: 'Second decision in Nautiloid',
        type: 'decision',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
        required: false,
      },
    ],
  },
  {
    name: 'Wilderness',
    decisions: [
      {
        id: 'story_wilderness_required',
        act: { id: 'act1', name: 'Act 1', regions: [] },
        description: 'Required wilderness decision',
        type: 'decision',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
        required: true,
      },
      {
        id: 'story_wilderness_optional',
        act: { id: 'act1', name: 'Act 1', regions: [] },
        description: 'Optional wilderness decision',
        type: 'decision',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
        required: false,
      },
      {
        id: 'story_wilderness_unavailable',
        act: { id: 'act1', name: 'Act 1', regions: [] },
        description: 'Unavailable wilderness decision',
        type: 'decision',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
        required: false,
        prerequisites: [
          {
            id: 'story_prerequisite_decision',
            act: mockAct,
            type: 'decision',
            description: 'Prerequisite',
            options: [],
          },
        ],
      },
    ],
  },
] as any // Type assertion to avoid ID format issues in storybook

// Mock functions for the section state controls
const mockSectionStates = {
  'act-act1': true,
  'region-act1-Nautiloid': false,
  'region-act1-Wilderness': true,
}

const meta: Meta<typeof ActSection> = {
  title: 'Sidebar/ActSection',
  component: ActSection,
  parameters: {
    layout: 'padded',
  },
  args: {
    act: mockAct,
    regions: mockRegions,
    defaultOpen: true,
    showRequired: true,
    showOptional: true,
    showUnavailable: true,
    searchTerm: '',
    sectionStates: mockSectionStates,
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
type Story = StoryObj<typeof ActSection>

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
          {
            id: 'story_shadowfell_decision',
            act: { id: 'act2', name: 'Act 2', regions: [] },
            description: 'Shadowfell decision',
            type: 'decision',
            options: [{ text: 'Option 1' }, { text: 'Option 2' }],
            required: true,
          },
        ],
      },
    ],
    sectionStates: {
      'act-act2': true,
      'region-act2-Shadowfell': false,
    },
  } as any, // Type assertion needed for the mock decisions
}

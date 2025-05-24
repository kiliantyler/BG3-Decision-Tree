import { SidebarProvider } from '@/components/ui/sidebar'
import { Act } from '@/data/acts'
import { DecisionType } from '@/types'
// Import mock decision data for stories
import { getDecisionsByActAndRegion } from '@mock/decisions'
import type { Meta, StoryObj } from '@storybook/react'
import { ActSection } from './act-section'

const meta: Meta<typeof ActSection> = {
  title: 'Components/Sidebar/ActSection',
  component: ActSection,
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
type Story = StoryObj<typeof ActSection>

const mockRegions = [
  {
    name: 'Nautiloid',
    decisions: [
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
    ],
  },
  {
    name: 'Wilderness',
    decisions: [
      {
        id: 'decision3' as any,
        act: Act.I,
        description: 'Resolve the conflict at the Druid Grove',
        type: DecisionType.DECISION,
        options: [
          { text: 'Help the druids' },
          { text: 'Side with Minthara and the goblins' },
          { text: 'Find a diplomatic resolution' },
        ],
        required: true,
      },
      {
        id: 'decision4' as any,
        act: Act.I,
        description: 'Deal with the Goblin Camp',
        type: DecisionType.DECISION,
        options: [
          { text: 'Infiltrate peacefully' },
          { text: 'Attack the goblins' },
          { text: 'Make a deal with Minthara' },
        ],
      },
    ],
  },
]

// Use mock data for stories
const mockActGroups = getDecisionsByActAndRegion()
const act1Group = mockActGroups.find(group => group.act.id === 'act1')
const act2Group = mockActGroups.find(group => group.act.id === 'act2')
const act3Group = mockActGroups.find(group => group.act.id === 'act3')

export const Default: Story = {
  args: {
    act: act1Group?.act || { id: 'act1', name: 'Act 1' },
    regions: act1Group?.regions || mockRegions,
    defaultOpen: true,
  },
}

export const Collapsed: Story = {
  args: {
    act: act1Group?.act || { id: 'act1', name: 'Act 1' },
    regions: act1Group?.regions || mockRegions,
    defaultOpen: false,
  },
}

export const ActTwo: Story = {
  args: {
    act: act2Group?.act || { id: 'act2', name: 'Act 2' },
    regions: act2Group?.regions || [
      {
        name: 'Shadowfell',
        decisions: [
          {
            id: 'shadow1' as any,
            act: Act.II,
            description: 'Encounter with the Shadow Lord',
            type: DecisionType.DECISION,
            options: [
              { text: 'Ally with the Shadow Lord' },
              { text: 'Challenge the Shadow Lord' },
              { text: 'Negotiate a deal' },
            ],
            required: true,
          },
        ],
      },
    ],
    defaultOpen: true,
  },
}

export const ActThree: Story = {
  args: {
    act: act3Group?.act || { id: 'act3', name: 'Act 3' },
    regions: act3Group?.regions || [
      {
        name: 'Upper City',
        decisions: [
          {
            id: 'uppercity1' as any,
            act: Act.III,
            description: 'Choose sides in the noble faction dispute',
            type: DecisionType.DECISION,
            options: [
              { text: 'Support House Vanthampur' },
              { text: 'Support the Thorm family' },
              { text: 'Play both sides against each other' },
            ],
            required: true,
          },
        ],
      },
    ],
    defaultOpen: true,
  },
}

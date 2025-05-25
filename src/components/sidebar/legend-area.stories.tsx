import type { Meta, StoryObj } from '@storybook/react'
import { LegendArea } from './legend-area'

const meta: Meta<typeof LegendArea> = {
  title: 'Sidebar/LegendArea',
  component: LegendArea,
  parameters: {
    layout: 'centered',
  },
  args: {
    showRequired: true,
    setShowRequired: () => {},
    showOptional: true,
    setShowOptional: () => {},
    showUnavailable: true,
    setShowUnavailable: () => {},
    collapseAllSections: () => {},
    expandAllSections: () => {},
    searchTerm: '',
    setSearchTerm: () => {},
  },
  argTypes: {
    showRequired: { control: 'boolean' },
    showOptional: { control: 'boolean' },
    showUnavailable: { control: 'boolean' },
    searchTerm: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof LegendArea>

export const Default: Story = {}

export const WithSearch: Story = {
  args: {
    searchTerm: 'goblin',
  },
}

export const PartialFilters: Story = {
  args: {
    showRequired: true,
    showOptional: false,
    showUnavailable: true,
  },
}

export const Interactive: Story = {
  render: args => {
    return (
      <div className="w-[300px] rounded-md border bg-background p-4">
        <LegendArea {...args} />
      </div>
    )
  },
}

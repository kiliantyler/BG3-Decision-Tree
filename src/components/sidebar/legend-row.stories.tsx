import type { Meta, StoryObj } from '@storybook/react'
import { LegendRow } from './legend-row'

const meta: Meta<typeof LegendRow> = {
  title: 'Sidebar/LegendRow',
  component: LegendRow,
  parameters: {
    layout: 'centered',
  },
  args: {
    color: '#f1f1f1',
    borderColor: '#cccccc',
    isDashed: false,
    opacity: 1,
    label: 'Legend Item',
    isChecked: true,
    onToggle: () => {},
  },
  argTypes: {
    color: { control: 'color' },
    borderColor: { control: 'color' },
    isDashed: { control: 'boolean' },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    label: { control: 'text' },
    isChecked: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof LegendRow>

export const Default: Story = {}

export const RequiredQuest: Story = {
  args: {
    color: '#fac564',
    borderColor: '#eb8c00',
    label: 'Required Quest',
    isChecked: true,
  },
}

export const OptionalQuest: Story = {
  args: {
    color: '#f1f1f1',
    borderColor: '#bbbbbb',
    label: 'Optional Side Quest',
    isChecked: true,
  },
}

export const UnavailableDecision: Story = {
  args: {
    color: '#f8f8f8',
    borderColor: '#999999',
    isDashed: true,
    opacity: 0.6,
    label: 'Unavailable Decision',
    isChecked: true,
  },
}

export const Unchecked: Story = {
  args: {
    isChecked: false,
  },
}

export const Interactive: Story = {
  render: args => {
    return (
      <div className="w-[300px] rounded-md border bg-background p-4">
        <LegendRow {...args} />
      </div>
    )
  },
}

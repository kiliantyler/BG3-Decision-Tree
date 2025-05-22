import { cn } from '@/lib/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DecisionRow } from './decision-row'

const meta: Meta<typeof DecisionRow> = {
  component: DecisionRow,
}

export default meta
type Story = StoryObj<typeof DecisionRow>

export const Default: Story = {
  decorators: [
    Story => (
      <div className={cn('max-w-md')}>
        <Story />
      </div>
    ),
  ],
}

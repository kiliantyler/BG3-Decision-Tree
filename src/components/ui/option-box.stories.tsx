import type { Meta, StoryObj } from '@storybook/react-vite'
import { OptionBox } from './option-box'

const meta: Meta<typeof OptionBox> = {
  component: OptionBox,
  decorators: [
    Story => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'Option Box',
  },
}

export default meta
type Story = StoryObj<typeof OptionBox>

export const Primary: Story = {
  args: {
    variant: 'default',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
}

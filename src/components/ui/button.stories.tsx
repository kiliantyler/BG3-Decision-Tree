import { cn } from '@/lib/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sun } from 'lucide-react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    size: 'icon',
    children: <Sun className={cn('size-5')} />,
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'hoverRingSecondary',
  },
}

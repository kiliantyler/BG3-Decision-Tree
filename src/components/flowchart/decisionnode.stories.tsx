import { Intro } from '@/data/decisions/act1/nautiloid/intro'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DecisionNode } from './decisionnode'

const meta: Meta<typeof DecisionNode> = {
  component: DecisionNode,
}

export default meta
type Story = StoryObj<typeof DecisionNode>

export const Default: Story = {
  args: {
    decision: Intro,
  },
}

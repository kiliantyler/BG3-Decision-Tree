import type { Meta, StoryObj } from '@storybook/react-vite'

import { DecisionNode } from './decisionnode'

const meta: Meta<typeof DecisionNode> = {
  component: DecisionNode,
}

export default meta
type Story = StoryObj<typeof DecisionNode>

export const Primary: Story = {}

import type { Decision } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import type { NodeTypes } from 'reactflow'
import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { DecisionNode } from './decisionnode'

const meta: Meta<typeof DecisionNode> = {
  title: 'Components/FlowChart/DecisionNode',
  component: DecisionNode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: '600px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DecisionNode>

// Setup for ReactFlow to use our custom node
const nodeTypes: NodeTypes = {
  decision: DecisionNode,
}

const baseDecision = {
  id: 'node1',
  type: 'decision',
  position: { x: 100, y: 100 },
  data: {
    decision: {
      id: 'decision1',
      name: 'Accept or reject the tadpole',
      description: 'Accept or reject the tadpole',
      options: [
        { name: 'Accept the tadpole' },
        { name: 'Reject the tadpole' },
      ],
    } as Decision<any>,
  },
}

// Base ReactFlow component with our node
const FlowWithNode = ({ nodes }: { nodes: any[] }) => {
  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  )
}

export const RequiredDecision: Story = {
  render: () => <FlowWithNode nodes={[baseDecision]} />,
}

export const OptionalDecision: Story = {
  render: () => (
    <FlowWithNode
      nodes={[
        {
          ...baseDecision,
          id: 'node2',
          data: {
            decision: {
              id: 'decision2',
              name: 'Optional side quest',
              description: 'Optional side quest',
              options: [
                { name: 'Option 1' },
                { name: 'Option 2' },
              ],
            } as Decision<any>,
          },
        },
      ]}
    />
  ),
}

export const LongDescription: Story = {
  render: () => (
    <FlowWithNode
      nodes={[
        {
          ...baseDecision,
          id: 'node3',
          data: {
            decision: {
              id: 'decision3',
              name: 'Long Description',
              description:
                'This is an extremely long decision description that should wrap or be truncated in the node component',
              options: [
                { name: 'Option 1' },
                { name: 'Option 2' },
              ],
            } as Decision<any>,
          },
        },
      ]}
    />
  ),
}

export const ManyOptions: Story = {
  render: () => (
    <FlowWithNode
      nodes={[
        {
          ...baseDecision,
          id: 'node4',
          data: {
            decision: {
              id: 'decision4',
              name: 'Decision with many options',
              description: 'Decision with many options',
              options: [
                { name: 'Option 1' },
                { name: 'Option 2' },
                { name: 'Option 3' },
                { name: 'Option 4' },
                { name: 'Option 5' },
              ],
            } as Decision<any>,
          },
        },
      ]}
    />
  ),
}

export const MultipleNodes: Story = {
  render: () => (
    <FlowWithNode
      nodes={[
        baseDecision,
        {
          ...baseDecision,
          id: 'node5',
          position: { x: 300, y: 100 },
          data: {
            decision: {
              id: 'decision5',
              name: 'Second decision node',
              description: 'Second decision node',
              options: [
                { name: 'Option 1' },
                { name: 'Option 2' },
              ],
            } as Decision<any>,
          },
        },
        {
          ...baseDecision,
          id: 'node6',
          position: { x: 200, y: 250 },
          data: {
            decision: {
              id: 'decision6',
              name: 'Act II Decision',
              description: 'Act II Decision',
              options: [
                { name: 'Option 1' },
                { name: 'Option 2' },
              ],
            } as Decision<any>,
          },
        },
      ]}
    />
  ),
}

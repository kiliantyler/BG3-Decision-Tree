import { Act } from '@/data/acts'
import { DecisionType } from '@/types'
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
              ...baseDecision.data.decision,
              id: 'decision2' as any,
              required: false,
              description: 'Optional side quest',
            },
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
              ...baseDecision.data.decision,
              id: 'decision3' as any,
              description:
                'This is an extremely long decision description that should wrap or be truncated in the node component',
            },
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
              ...baseDecision.data.decision,
              id: 'decision4' as any,
              description: 'Decision with many options',
              options: [
                { text: 'Option 1' },
                { text: 'Option 2' },
                { text: 'Option 3' },
                { text: 'Option 4' },
                { text: 'Option 5' },
              ],
            },
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
              ...baseDecision.data.decision,
              id: 'decision5' as any,
              required: false,
              description: 'Second decision node',
            },
          },
        },
        {
          ...baseDecision,
          id: 'node6',
          position: { x: 200, y: 250 },
          data: {
            decision: {
              ...baseDecision.data.decision,
              id: 'decision6' as any,
              act: Act.II,
              description: 'Act II Decision',
            },
          },
        },
      ]}
    />
  ),
}

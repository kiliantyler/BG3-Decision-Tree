import { Intro } from '@/data/decisions/act1/nautiloid/intro'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Edge } from 'reactflow'
import { FlowChart } from './flowchart'

const meta: Meta<typeof FlowChart> = {
  component: FlowChart,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    Story => (
      <div className="h-[500px] w-[900px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FlowChart>

const initialNodes = [
  {
    id: 'node-1',
    type: 'decisionNode',
    position: { x: 100, y: 50 },
    data: {
      decision: Intro,
      onComplete: (id: string, option: any, wasAlreadyCompleted: boolean) => {
        console.log('Decision completed:', id, option, wasAlreadyCompleted)
      },
      onRemove: (id: string) => {
        console.log('Remove node:', id)
      },
    },
  },
  {
    id: 'node-2',
    type: 'decisionNode',
    position: { x: 500, y: 250 },
    data: {
      decision: {
        ...Intro,
        id: 'secondary_decision',
        description: 'Secondary Decision',
        required: true,
      },
      onComplete: (id: string, option: any, wasAlreadyCompleted: boolean) => {
        console.log('Decision completed:', id, option, wasAlreadyCompleted)
      },
      onRemove: (id: string) => {
        console.log('Remove node:', id)
      },
    },
  },
]

const initialEdges: Edge[] = [
  {
    id: 'edge-1-2',
    source: 'node-1',
    target: 'node-2',
    animated: true,
    style: { stroke: '#555', strokeWidth: 2 },
  },
]

export const Empty: Story = {
  args: {},
}

export const WithNodes: Story = {
  args: {
    initialNodes,
    initialEdges,
  },
}

export const WithPanelContent: Story = {
  args: {
    initialNodes,
    initialEdges,
    children: (
      <div className="rounded bg-card p-4 shadow">
        <h3 className="mb-2 font-bold">Flowchart Controls</h3>
        <button className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground">
          Add Node
        </button>
      </div>
    ),
  },
}

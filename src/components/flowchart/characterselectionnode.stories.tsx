import { TooltipProvider } from '@/components/ui/tooltip'
import { OriginCharacter } from '@/data/characters'
import { CharacterType } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import type { NodeTypes } from 'reactflow'
import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { CharacterSelectionNode } from './characterselectionnode'

const meta: Meta<typeof CharacterSelectionNode> = {
  title: 'Components/FlowChart/CharacterSelectionNode',
  component: CharacterSelectionNode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <TooltipProvider>
        <div style={{ width: '700px', height: '500px' }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CharacterSelectionNode>

// Convert Origin characters to the format expected by the component
const originCharacters = Object.entries(OriginCharacter).map(
  ([key, value]) => ({
    id: value.id,
    name: value.name,
    type: CharacterType.PLAYABLE,
    description:
      value.description ||
      `Play as ${value.name}, an origin character with a unique story.`,
  }),
)

// Setup for ReactFlow to use our custom node
const nodeTypes: NodeTypes = {
  characterSelection: CharacterSelectionNode,
}

// Base ReactFlow component with our node
const FlowWithNode = ({ nodeData }: { nodeData: any }) => {
  const nodes = [
    {
      id: 'character-selection',
      type: 'characterSelection',
      position: { x: 100, y: 100 },
      data: nodeData,
    },
  ]

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

export const Default: Story = {
  render: () => (
    <FlowWithNode
      nodeData={{
        title: 'Choose Your Origin Character',
        characters: originCharacters,
        onSelect: (characterId: string) =>
          console.log(`Selected character: ${characterId}`),
      }}
    />
  ),
}

export const WithSelected: Story = {
  render: () => (
    <FlowWithNode
      nodeData={{
        title: 'Choose Your Origin Character',
        characters: originCharacters,
        selectedCharacter: originCharacters[0],
        onSelect: (characterId: string) =>
          console.log(`Selected character: ${characterId}`),
      }}
    />
  ),
}

export const CustomTitle: Story = {
  render: () => (
    <FlowWithNode
      nodeData={{
        title: "Who Will You Be In Baldur's Gate?",
        characters: originCharacters,
        onSelect: (characterId: string) =>
          console.log(`Selected character: ${characterId}`),
      }}
    />
  ),
}

export const FewerCharacters: Story = {
  render: () => (
    <FlowWithNode
      nodeData={{
        title: 'Select Your Character',
        characters: originCharacters.slice(0, 3), // Just show first 3
        onSelect: (characterId: string) =>
          console.log(`Selected character: ${characterId}`),
      }}
    />
  ),
}

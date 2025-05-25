import { OriginCharacter } from '@/data/characters'
import { CharacterType } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import 'reactflow/dist/style.css'
import { FlowChart } from './flowchart'

const meta: Meta<typeof FlowChart> = {
  title: 'Components/FlowChart/FlowChart',
  component: FlowChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: '100%', height: '700px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FlowChart>

// Convert Origin characters to Character objects for the node
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

// Basic nodes with just a character selection node
const characterSelectionNodes = [
  {
    id: 'character-selection',
    type: 'characterSelection',
    position: { x: 0, y: 0 },
    data: {
      title: 'Choose Your Origin Character',
      characters: originCharacters,
      onSelect: (characterId: string) => {
        console.log(`Selected character: ${characterId}`)
      },
    },
  },
]

// Nodes with character selection and some decision nodes
const flowWithDecisionsNodes = [
  {
    id: 'character-selection',
    type: 'characterSelection',
    position: { x: 0, y: 0 },
    data: {
      title: 'Choose Your Origin Character',
      characters: originCharacters,
      selectedCharacter: originCharacters[0], // Astarion selected
      onSelect: (characterId: string) => {
        console.log(`Selected character: ${characterId}`)
      },
    },
  },
  {
    id: 'decision-1',
    type: 'decisionNode',
    position: { x: 0, y: 300 },
    data: {
      decision: {
        id: 'nautiloid_start',
        description: 'Accept or reject the tadpole?',
        type: 'decision',
        required: true,
        options: [
          { text: 'Accept the tadpole' },
          { text: 'Reject the tadpole' },
        ],
      },
    },
  },
  {
    id: 'decision-2',
    type: 'decisionNode',
    position: { x: -250, y: 550 },
    data: {
      decision: {
        id: 'nautiloid_pods',
        description: 'Who do you save from the pods?',
        type: 'decision',
        options: [
          { text: 'Save Shadowheart' },
          { text: "Save Lae'zel" },
          { text: 'Save no one' },
        ],
      },
    },
  },
  {
    id: 'decision-3',
    type: 'decisionNode',
    position: { x: 250, y: 550 },
    data: {
      decision: {
        id: 'nautiloid_controls',
        description: 'Activate ship controls?',
        type: 'decision',
        options: [
          { text: 'Use controls to activate defense systems' },
          { text: 'Ignore the controls' },
        ],
      },
    },
  },
]

// Edges connecting the nodes
const flowWithDecisionsEdges = [
  {
    id: 'edge-1',
    source: 'character-selection',
    target: 'decision-1',
    type: 'default',
  },
  {
    id: 'edge-2',
    source: 'decision-1',
    target: 'decision-2',
    type: 'default',
  },
  {
    id: 'edge-3',
    source: 'decision-1',
    target: 'decision-3',
    type: 'default',
  },
]

export const DefaultWithCharacterSelection: Story = {
  args: {
    // No initialNodes - will show default character selection node
    initialNodes: [],
    initialEdges: [],
  },
}

export const CharacterSelectionOnly: Story = {
  args: {
    initialNodes: characterSelectionNodes,
    initialEdges: [],
  },
}

export const WithDecisions: Story = {
  args: {
    initialNodes: flowWithDecisionsNodes,
    initialEdges: flowWithDecisionsEdges,
  },
}

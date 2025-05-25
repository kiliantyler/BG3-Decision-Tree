import { OriginCharacter } from '@/data/characters'
import { cn } from '@/lib/utils'
import { useCallback } from 'react'
import type { Connection, Edge, Node, NodeTypes } from 'reactflow'
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { CharacterSelectionNode } from './characterselectionnode'
import { DecisionNode } from './decisionnode'

// Define custom node types
const nodeTypes: NodeTypes = {
  decisionNode: DecisionNode,
  characterSelection: CharacterSelectionNode,
}

const proOptions = { hideAttribution: true }

interface FlowChartProps {
  children?: React.ReactNode
  initialNodes?: any[]
  initialEdges?: Edge[]
}

// Default character selection node to show when no nodes are provided
const defaultCharacterSelectionNode: Node = {
  id: 'character-selection-root',
  type: 'characterSelection',
  position: { x: 0, y: 0 },
  data: {
    title: 'Choose Your Origin Character',
    characters: Object.values(OriginCharacter),
    onSelect: (characterId: string) => {
      console.log(`Selected character: ${characterId}`)
    },
  },
}

function FlowChart({
  children,
  initialNodes = [],
  initialEdges = [],
}: FlowChartProps) {
  // If no nodes provided, start with character selection node
  const startingNodes =
    initialNodes.length > 0 ? initialNodes : [defaultCharacterSelectionNode]

  // Setup nodes state
  const [nodes, setNodes, onNodesChange] = useNodesState(startingNodes)
  // Setup edges state
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Handle node connections
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(eds => addEdge(connection, eds))
    },
    [setEdges],
  )

  return (
    <div className={cn('h-full', 'w-full')}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        proOptions={proOptions}
      >
        <Background
          size={3}
          variant={BackgroundVariant.Cross}
        />
        <Panel position="top-left">{children}</Panel>
        <Controls />
      </ReactFlow>
    </div>
  )
}

export { FlowChart }

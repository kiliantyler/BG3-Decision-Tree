import { cn } from '@/lib/utils'
import { useCallback } from 'react'
import type { Connection, Edge, NodeTypes } from 'reactflow'
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
import { DecisionNode } from './decisionnode'

// Define custom node types
const nodeTypes: NodeTypes = {
  decisionNode: DecisionNode,
}

const proOptions = { hideAttribution: true }

interface FlowChartProps {
  children?: React.ReactNode
  initialNodes?: any[]
  initialEdges?: Edge[]
}

function FlowChart({
  children,
  initialNodes = [],
  initialEdges = [],
}: FlowChartProps) {
  // Setup nodes state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
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

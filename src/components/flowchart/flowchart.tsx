import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'

const proOptions = { hideAttribution: true }

function FlowChart({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      {children}
      <ReactFlow
        nodes={[]}
        edges={[]}
        onNodesChange={() => {}}
        onEdgesChange={() => {}}
        onConnect={() => {}}
        fitView
        minZoom={0.1}
        maxZoom={2}
        proOptions={proOptions}
      >
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export { FlowChart }

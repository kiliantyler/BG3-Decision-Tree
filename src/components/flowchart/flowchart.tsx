import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'

function FlowChart() {
  return (
    <div className="reactflow-wrapper">
      <ReactFlow
        nodes={[]}
        edges={[]}
        onNodesChange={() => {}}
        onEdgesChange={() => {}}
        onConnect={() => {}}
        fitView
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="bottom-center"
      >
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export { FlowChart }

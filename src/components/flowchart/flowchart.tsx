import ReactFlow, { Background, BackgroundVariant, Panel } from 'reactflow'
import 'reactflow/dist/style.css'

const proOptions = { hideAttribution: true }

function FlowChart({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
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
        <Background size={3} variant={BackgroundVariant.Cross} />
        <Panel position="top-left">{children}</Panel>
        {/* <Controls /> */}
      </ReactFlow>
    </div>
  )
}

export { FlowChart }

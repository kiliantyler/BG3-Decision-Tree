import { FlowChart } from '@/components/flowchart/flowchart'
import '@/styles/customStyles.css'
import { ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'
// import '../../styles/theme.css'

// Components

// Context

function App() {
  return (
    <ReactFlowProvider>
      <FlowChart />
      {/* <ThemeProvider>
        <DecisionProvider>
          <AppContent />
        </DecisionProvider>
      </ThemeProvider> */}
    </ReactFlowProvider>
  )
}

export { App }

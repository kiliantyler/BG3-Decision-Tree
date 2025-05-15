import { ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'
import '../../styles/customStyles.css'
import '../../styles/theme.css'

// Components

// Context

function App() {
  return (
    <ReactFlowProvider>
      {/* <ThemeProvider>
        <DecisionProvider>
          <AppContent />
        </DecisionProvider>
      </ThemeProvider> */}
    </ReactFlowProvider>
  )
}

export { App }

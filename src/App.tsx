import { FlowChart } from '@/components/flowchart/flowchart'
import { ThemeProvider } from '@/components/theme-provider'
import { ReactFlowProvider } from 'reactflow'
import { AppSidebar } from './components/sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReactFlowProvider>
        <SidebarProvider className="w-full h-full">
          {/* Reactflow needs full width and height in the surrounding container */}
          <AppSidebar />
          <FlowChart>
            <SidebarTrigger className="absolute z-100" />
          </FlowChart>
          {/* <DecisionProvider>
          <AppContent />
        </DecisionProvider> */}
        </SidebarProvider>
      </ReactFlowProvider>
    </ThemeProvider>
  )
}

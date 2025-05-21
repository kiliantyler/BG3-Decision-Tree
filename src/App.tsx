import { FlowChart } from '@/components/flowchart/flowchart'
import { ThemeProvider } from '@/components/theme-provider'
import { ReactFlowProvider } from 'reactflow'
import { AppSidebar } from './components/sidebar/app-sidebar'
import { SidebarProvider } from './components/ui/sidebar'
import { SidebarButton } from './components/ui/sidebarbutton'

export function App() {
  const sidebarState = localStorage.getItem('sidebar') === 'true'

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReactFlowProvider>
        <SidebarProvider defaultOpen={sidebarState} className="w-full h-full">
          {/* Reactflow needs full width and height in the surrounding container */}
          <AppSidebar />
          <FlowChart>
            <SidebarButton className="absolute z-100 ml-4 mt-4" />
          </FlowChart>
          {/* <DecisionProvider>
          <AppContent />
        </DecisionProvider> */}
        </SidebarProvider>
      </ReactFlowProvider>
    </ThemeProvider>
  )
}

import { FlowChart } from '@/components/flowchart/flowchart'
import { ThemeProvider } from '@/components/theme-provider'
import { ReactFlowProvider } from 'reactflow'
import { AppSidebar } from './components/sidebar/app-sidebar'
import { SidebarProvider } from './components/ui/sidebar'
import { SidebarButton } from './components/ui/sidebarbutton'
import { cn } from './lib/utils'

export function App() {
  // Safely access localStorage with fallback for environments where it's not available
  const getSafeLocalStorage = (key: string, defaultValue: boolean): boolean => {
    try {
      return localStorage.getItem(key) === 'true'
    } catch (error) {
      // Handle cases where localStorage is unavailable (private browsing, permissions)
      console.warn(`Unable to access localStorage: ${error}`)
      return defaultValue
    }
  }

  const sidebarState = getSafeLocalStorage('sidebar', true)

  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <ReactFlowProvider>
        <SidebarProvider
          defaultOpen={sidebarState}
          className={cn('h-full', 'w-full')}
        >
          {/* Reactflow needs full width and height in the surrounding container */}
          <AppSidebar />
          <FlowChart>
            <SidebarButton />
          </FlowChart>
          {/* <DecisionProvider>
          <AppContent />
        </DecisionProvider> */}
        </SidebarProvider>
      </ReactFlowProvider>
    </ThemeProvider>
  )
}

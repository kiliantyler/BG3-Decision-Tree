import { SidebarProvider } from '@/components/ui/sidebar'
import type { Meta, StoryObj } from '@storybook/react'
import { AppSidebar } from './app-sidebar'
// Import AppSidebar component

// Wrap AppSidebar in SidebarProvider to fix "useSidebar must be used within a SidebarProvider" error
const AppSidebarWithProvider = () => (
  <SidebarProvider>
    <AppSidebar />
  </SidebarProvider>
)

const meta: Meta<typeof AppSidebarWithProvider> = {
  title: 'Sidebar/AppSidebar',
  component: AppSidebarWithProvider,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
  // No args needed since AppSidebar loads its own data internally
}

export default meta
type Story = StoryObj<typeof AppSidebarWithProvider>

export const Default: Story = {}

// Using story decorators to demonstrate different viewport sizes
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

export const CollapsedView: Story = {
  decorators: [
    Story => (
      <div className="flex">
        <div
          id="sidebar"
          className="collapsed"
        >
          <Story />
        </div>
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold">Main Content Area</h1>
          <p className="mt-2">
            This shows the main content beside a collapsed sidebar.
          </p>
        </div>
      </div>
    ),
  ],
}

export const ExpandedView: Story = {
  decorators: [
    Story => (
      <div className="flex">
        <div id="sidebar">
          <Story />
        </div>
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold">Main Content Area</h1>
          <p className="mt-2">
            This shows the main content beside an expanded sidebar.
          </p>
        </div>
      </div>
    ),
  ],
}

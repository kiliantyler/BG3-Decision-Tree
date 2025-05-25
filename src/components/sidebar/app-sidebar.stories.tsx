import type { Meta, StoryObj } from '@storybook/react'
import { AppSidebar } from './app-sidebar'

const meta: Meta<typeof AppSidebar> = {
  title: 'Sidebar/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
  // No args needed since AppSidebar loads its own data from mock sources
}

export default meta
type Story = StoryObj<typeof AppSidebar>

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

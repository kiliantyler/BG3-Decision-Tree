import { cn } from '@/lib/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarProvider } from '@ui/sidebar'
import { SidebarButton } from '@ui/sidebarbutton'
import { AppSidebar } from './app-sidebar'

const meta: Meta<typeof AppSidebar> = {
  component: AppSidebar,
}

export default meta
type Story = StoryObj<typeof AppSidebar>

export const Default: Story = {
  decorators: [
    Story => (
      <div className={cn('flex', 'min-h-screen')}>
        <SidebarProvider>
          <Story />
          <div className="p-4">
            <SidebarButton className={cn('mb-4')} />
            <div className={cn('max-w-md')}>
              <h1 className={cn('mb-4', 'text-2xl', 'font-bold')}>Dashboard</h1>
              <p className={cn('text-muted-foreground')}>
                This is the main content area. You can toggle the sidebar using
                the button above, or by pressing CMD+B on macOS or CTRL+B on
                Windows.
              </p>
            </div>
          </div>
        </SidebarProvider>
      </div>
    ),
  ],
}

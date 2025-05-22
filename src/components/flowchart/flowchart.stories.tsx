import { cn } from '@/lib/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarProvider } from '@ui/sidebar'
import { ReactFlowProvider } from 'reactflow'
import { SidebarButton } from '../ui/sidebarbutton'
import { FlowChart } from './flowchart'

const meta: Meta<typeof FlowChart> = {
  component: FlowChart,
}

export default meta
type Story = StoryObj<typeof FlowChart>

export const Primary: Story = {
  decorators: [
    Story => (
      <ReactFlowProvider>
        <SidebarProvider className={cn('h-100', 'w-full')}>
          <Story>
            <SidebarButton />
          </Story>
        </SidebarProvider>
      </ReactFlowProvider>
    ),
  ],
}

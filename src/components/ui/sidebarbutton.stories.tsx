import { cn } from '@/lib/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarProvider } from '@ui/sidebar'
import { SidebarButton } from './sidebarbutton'

const meta: Meta<typeof SidebarButton> = {
  component: SidebarButton,
}

export default meta
type Story = StoryObj<typeof SidebarButton>

export const Primary: Story = {
  decorators: [
    Story => (
      <SidebarProvider className={cn('h-100', 'w-full')}>
        <Story />
      </SidebarProvider>
    ),
  ],
}

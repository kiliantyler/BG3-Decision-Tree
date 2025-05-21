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
      <SidebarProvider className="w-full h-100">
        <Story />
      </SidebarProvider>
    ),
  ],
}

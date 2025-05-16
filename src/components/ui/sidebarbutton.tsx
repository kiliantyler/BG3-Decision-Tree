'use client'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { PanelLeftIcon } from 'lucide-react'

export function SidebarButton({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="secondary"
      size="icon"
      className={cn('size-10', 'muted-foreground', className)}
      onClick={event => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon className="size-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

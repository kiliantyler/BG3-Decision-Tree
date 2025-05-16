'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Moon } from 'lucide-react'

export function ThemeButton({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  // const { setTheme } = useTheme()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="secondary"
      size="icon"
      className={cn('size-10', 'muted-foreground', className)}
      onClick={event => {
        onClick?.(event)
      }}
      {...props}
    >
      <Moon className="size-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

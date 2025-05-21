import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'

export function OptionBox({ className, ...props }: React.ComponentProps<'div'>) {
  /*
    In the future this should detect if the text is too long and add the text overflow
    and text ellipsis classes to the div. The rest of the text should be in the hovercard.
  */

  return (
    <div>
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger>
          <p
            className={cn(
              'truncate min-h-9 max-h-9 rounded-md border px-4 py-2 font-mono text-sm text-primary-foreground transition-all duration-300 hover:ring-2 hover:ring-primary/80 hover:ring-offset-1 hover:ring-offset-background',
              className
            )}
            {...props}
          />
        </HoverCardTrigger>
        <HoverCardContent sideOffset={5} side="right">
          The React Framework – created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

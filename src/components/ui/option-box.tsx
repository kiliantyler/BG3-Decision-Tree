import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const hoverVariants = cva(
  'bg-secondary select-none truncate min-h-9 max-h-9 rounded-md border px-4 py-2 font-mono text-sm text-secondary-foreground transition-all duration-300 hover:ring-2 hover:ring-offset-1 hover:ring-offset-background',
  {
    variants: {
      variant: {
        default: 'hover:ring-primary/80',
        destructive: 'hover:ring-destructive/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function OptionBox({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof hoverVariants>) {
  return (
    <div>
      <HoverCard
        openDelay={100}
        closeDelay={100}
      >
        <HoverCardTrigger>
          <p
            className={cn(hoverVariants({ variant }), className)}
            {...props}
          />
        </HoverCardTrigger>
        <HoverCardContent
          sideOffset={5}
          side="right"
          {...props}
        />
      </HoverCard>
    </div>
  )
}

export { OptionBox }

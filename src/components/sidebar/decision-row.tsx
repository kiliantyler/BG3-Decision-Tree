import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSidebar } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

export function DecisionRow() {
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  // Collapsed version of the card
  if (isCollapsed && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="select-none">
            <Card
              className={cn(
                'flex',
                'h-12',
                'w-12',
                'items-center',
                'justify-center',
                'rounded-md',
                'transition-all',
              )}
            >
              <CardContent
                className={cn(
                  'flex',
                  'h-full',
                  'w-full',
                  'items-center',
                  'justify-center',
                  'p-2',
                )}
              >
                <p className={cn('font-medium')}>CT</p>
              </CardContent>
            </Card>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
        >
          <div>
            <p className={cn('font-medium')}>Card Title</p>
            <p className={cn('text-xs', 'text-muted-foreground')}>
              Card Description
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  // Normal version of the card

  return (
    <div className="px-2">
      <Card className={cn('transition-all', isCollapsed && 'h-12 w-12')}>
        <CardHeader className="grid-cols-4">
          <CardTitle className="col-span-3">Card Title</CardTitle>
          <Badge
            variant={'secondary'}
            className="justify-self-end"
          >
            Optional
          </Badge>
          <CardDescription className="col-span-4">
            Card Description
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )

  // Expanded version of the card
  return (
    <div className="px-2">
      <Card className={cn('transition-all', isCollapsed && 'h-12 w-12')}>
        <CardHeader className="grid-cols-4">
          <CardTitle className="col-span-3">Card Title</CardTitle>
          <Badge
            variant={'secondary'}
            className="justify-self-end"
          >
            Optional
          </Badge>
          <CardDescription className="col-span-4">
            Card Description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  )
}

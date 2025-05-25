import { useSidebar } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { Decision } from '@/types'
import { Badge } from '../ui/badge'

export interface DecisionRowProps {
  decision: Decision
}

export function DecisionRow({ decision }: DecisionRowProps) {
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  // Collapsed version of the card
  if (isCollapsed && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="select-none">
            <div
              className={cn(
                'flex',
                'h-10',
                'w-10',
                'items-center',
                'justify-center',
                'rounded-md',
                'bg-secondary/50',
                'hover:bg-secondary',
                'transition-all',
              )}
            >
              <p className={cn('font-medium', 'text-sm')}>
                {decision.id.substring(0, 2).toUpperCase()}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="start"
          sideOffset={10}
          className="w-60 border border-gray-200 bg-popover p-2 shadow-md dark:border-gray-700"
        >
          <div>
            <p className={cn('font-medium')}>{decision.description}</p>
            {decision.options.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium">Options:</p>
                <ul className="ml-2 space-y-0.5 text-xs">
                  {decision.options.map((option, idx) => (
                    <li
                      key={idx}
                      className="text-muted-foreground"
                    >
                      • {option.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  // Normal version - simplified to match the sidebar section style
  return (
    <div
      className={cn(
        'group rounded-md px-2.5 py-1 select-none',
        'border transition-all hover:bg-secondary/50',
        decision.required
          ? 'border-primary'
          : 'border-dashed border-gray-200/60 dark:border-gray-700/60',
      )}
    >
      <div className="flex flex-col overflow-hidden">
        <div className="truncate font-medium">{decision.description}</div>
        <div className="flex items-center justify-between">
          <Badge
            variant={decision.required ? 'default' : 'secondary'}
            className={cn(
              'mt-0.5 shrink-0 text-xs opacity-70 group-hover:opacity-100',
              decision.required ? 'bg-primary text-primary-foreground' : '',
            )}
          >
            {decision.required ? 'Required' : 'Optional'}
          </Badge>
        </div>
      </div>
    </div>
  )
}

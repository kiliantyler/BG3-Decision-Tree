import { useSidebar } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { Decision } from '@/types'
import * as React from 'react'
import { Badge } from '../ui/badge'
import { isDecisionUnavailable } from './helpers/decision-status'

export interface DecisionRowProps {
  decision: Decision<any>
}

export function DecisionRow({ decision }: DecisionRowProps) {
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  // Use empty array for completed decisions in the main app
  // In a real app, this would come from a global state or context
  const completedDecisions: Decision<any>[] = []

  // Use the helper function to determine if the decision is unavailable
  const isUnavailable = isDecisionUnavailable(decision, completedDecisions)

  // For debugging issues with dependencies
  React.useEffect(() => {
    if (decision.dependencies?.length) {
      console.debug(
        `Decision ${decision.id} - hasDeps: ${!!decision.dependencies?.length} - isUnavailable: ${isUnavailable}`,
      )
    }
  }, [decision, isUnavailable])

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

            {/* Show badges in tooltip too */}
            <div className="mt-1 flex gap-1">
              {/* First badge - Required or Optional */}
              <span
                className={cn(
                  'rounded-sm px-1.5 py-0.5 text-xs',
                  decision.required
                    ? 'bg-primary/20 text-primary-foreground/90'
                    : 'bg-secondary/50',
                )}
              >
                {decision.required ? 'Required' : 'Optional'}
              </span>

              {/* Second badge - Unavailable (if applicable) */}
              {isUnavailable && (
                <span className="rounded-sm border border-dashed px-1.5 py-0.5 text-xs">
                  Unavailable
                </span>
              )}
            </div>

            {decision.options.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium">Options:</p>
                <ul className="ml-2 space-y-0.5 text-xs">
                  {decision.options.map(
                    (option: { name: string }, idx: number) => (
                      <li
                        key={idx}
                        className="text-muted-foreground"
                      >
                        • {option.name}
                      </li>
                    ),
                  )}
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
          <div className="flex gap-1">
            {/* First badge - always shows Required or Optional */}
            <Badge
              variant={decision.required ? 'default' : 'secondary'}
              className={cn(
                'mt-0.5 shrink-0 text-xs opacity-70 group-hover:opacity-100',
                decision.required ? 'bg-primary text-primary-foreground' : '',
              )}
            >
              {decision.required ? 'Required' : 'Optional'}
            </Badge>

            {/* Second badge - only shows when the decision is unavailable */}
            {isUnavailable && (
              <Badge
                variant="outline"
                className="mt-0.5 shrink-0 border-dashed text-xs opacity-70 group-hover:opacity-100"
              >
                Unavailable
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

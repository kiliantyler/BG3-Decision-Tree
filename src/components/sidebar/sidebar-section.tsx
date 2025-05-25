import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useSidebar } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { Decision } from '@/types'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { DecisionRow } from './decision-row'

interface SidebarSectionProps {
  title: string
  subtitle?: string
  decisions: Decision[]
  badge?: {
    text: string
    variant?: 'default' | 'outline' | 'secondary'
  }
  defaultOpen?: boolean
}

export function SidebarSection({
  title,
  subtitle,
  decisions,
  badge,
  defaultOpen = true,
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  // In collapsed sidebar state, regions are not shown
  if (isCollapsed && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center',
              'bg-secondary/20 hover:bg-secondary/30 rounded-md',
              'mb-2 cursor-pointer transition-colors',
            )}
          >
            <span className="text-sm font-medium">{title.slice(0, 2)}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="start"
          sideOffset={20}
          className="bg-popover w-72 border border-gray-200 p-3 shadow-md dark:border-gray-700"
        >
          <div className="mb-2">
            <p className="font-medium">{title}</p>
            {subtitle && (
              <p className="text-muted-foreground text-xs">{subtitle}</p>
            )}
            {badge && <p className="text-xs">{badge.text}</p>}
          </div>

          <div className="mt-1 space-y-1 border-t border-gray-200/40 pt-2 dark:border-gray-700/40">
            {decisions.map(decision => (
              <div
                key={decision.id}
                className={cn(
                  'rounded-sm px-2 py-1 text-sm',
                  'bg-background border',
                  decision.required
                    ? 'border-primary/70'
                    : 'border-dashed border-gray-200/40 dark:border-gray-700/40',
                )}
              >
                <p className="truncate text-sm font-medium">
                  {decision.description}
                </p>
                <div className="flex">
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
                </div>
              </div>
            ))}

            {decisions.length === 0 && (
              <p className="text-muted-foreground text-sm italic">
                No decisions available
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <div className="mb-2">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger className="w-full">
          <div className="bg-secondary/20 hover:bg-secondary/30 flex items-center justify-between rounded-md px-3 py-2">
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-2">
                <span className="font-medium">{title}</span>
                {badge && (
                  <Badge
                    variant={badge.variant || 'secondary'}
                    className="text-xs"
                  >
                    {badge.text}
                  </Badge>
                )}
              </div>
              {subtitle && (
                <span className="text-muted-foreground text-xs">
                  {subtitle}
                </span>
              )}
            </div>
            <ChevronDown
              className={cn(
                'text-muted-foreground h-4 w-4 transition-transform',
                isOpen && 'rotate-180',
              )}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-1 py-1">
            {decisions.map(decision => (
              <DecisionRow
                key={decision.id}
                decision={decision}
              />
            ))}
            {decisions.length === 0 && (
              <div className="text-muted-foreground px-2 py-1 text-xs">
                No decisions available
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

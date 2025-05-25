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
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { SidebarSection } from './sidebar-section'

interface ActSectionProps {
  act: {
    id: string
    name: string
  }
  regions: {
    name: string
    decisions: any[]
  }[]
  defaultOpen?: boolean
  showRequired?: boolean
  showOptional?: boolean
  showUnavailable?: boolean
  searchTerm?: string
  // External control for open/close state
  isOpenExternal?: boolean
  onOpenChangeExternal?: (open: boolean) => void
  // Nested section states for regions
  sectionStates?: Record<string, boolean>
}

export function ActSection({
  act,
  regions,
  defaultOpen = true,
  showRequired = true,
  showOptional = true,
  showUnavailable = true,
  searchTerm = '',
  // External control props
  isOpenExternal,
  onOpenChangeExternal,
  // Section states for nested regions
  sectionStates,
}: ActSectionProps) {
  // Internal state for when external control is not provided
  const [isOpenInternal, setIsOpenInternal] = React.useState(defaultOpen)

  // Use external state if provided, otherwise use internal state
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : isOpenInternal

  // Handle open/close changes
  const handleOpenChange = (open: boolean) => {
    // Call external handler if provided
    if (onOpenChangeExternal) {
      onOpenChangeExternal(open)
    } else {
      // Otherwise use internal state
      setIsOpenInternal(open)
    }
  }
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  // Count required decisions across all regions
  const requiredCount = regions.reduce(
    (total, region) => total + region.decisions.filter(d => d.required).length,
    0,
  )

  // Count total decisions across all regions
  const totalDecisions = regions.reduce(
    (total, region) => total + region.decisions.length,
    0,
  )

  // Collapsed version of the act section
  if (isCollapsed && !isMobile) {
    return (
      <div className="mb-4">
        <div className="mb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center',
                  'rounded-md bg-primary/10 hover:bg-primary/20',
                  'cursor-pointer transition-colors',
                )}
              >
                {/* Display Roman numeral for collapsed act */}
                <span className="font-bold">
                  {act.id === 'act1'
                    ? 'I'
                    : act.id === 'act2'
                      ? 'II'
                      : act.id === 'act3'
                        ? 'III'
                        : act.name.slice(0, 1)}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              align="start"
              sideOffset={20}
              className="w-72 border border-gray-200 bg-popover p-3 shadow-md dark:border-gray-700"
            >
              <div className="mb-2">
                <p className="font-semibold">{act.name}</p>
                <p className="text-xs text-muted-foreground">
                  {totalDecisions} decisions ({requiredCount} required)
                </p>
              </div>

              <div className="mt-1 space-y-1.5 border-t border-gray-200/40 pt-2 dark:border-gray-700/40">
                {regions.map(region => (
                  <div
                    key={region.name}
                    className="mb-2"
                  >
                    <p className="text-sm font-medium">{region.name}</p>
                    <div className="mt-1 ml-2 space-y-1">
                      {region.decisions.slice(0, 3).map(decision => (
                        <div
                          key={decision.id}
                          className={cn(
                            'rounded-sm px-2 py-1 text-sm',
                            'border bg-background',
                            decision.required
                              ? 'border-primary/70'
                              : 'border-dashed border-gray-200/40 dark:border-gray-700/40',
                          )}
                        >
                          <p className="truncate text-sm font-medium">
                            {decision.description}
                          </p>
                        </div>
                      ))}
                      {region.decisions.length > 3 && (
                        <p className="ml-2 text-xs text-muted-foreground">
                          +{region.decisions.length - 3} more decisions
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* In the collapsed state, show region sections */}
        <div className="space-y-1.5">
          {regions.map(region => (
            <SidebarSection
              key={`${act.id}-${region.name}`}
              title={region.name}
              subtitle={`${region.decisions.length} decision${
                region.decisions.length === 1 ? '' : 's'
              }`}
              decisions={region.decisions}
              badge={{
                text: `${
                  region.decisions.filter(d => d.required).length
                } Required`,
                variant: 'outline',
              }}
              defaultOpen={false}
            />
          ))}
        </div>
      </div>
    )
  }

  // Filter the decisions based on the filter settings and search term
  const filteredRegions = regions
    .map(region => {
      const filteredDecisions = region.decisions.filter(decision => {
        // Filter by decision visibility
        if (decision.required && !showRequired) return false
        if (!decision.required && !showOptional) return false
        if (decision.unavailable && !showUnavailable) return false

        // Filter by search term
        if (searchTerm && searchTerm.length > 0) {
          const searchLower = searchTerm.toLowerCase()
          return decision.description.toLowerCase().includes(searchLower)
        }

        return true
      })

      return {
        ...region,
        decisions: filteredDecisions,
      }
    })
    .filter(region => region.decisions.length > 0) // Only show regions with decisions

  // Count filtered decisions
  const filteredTotalDecisions = filteredRegions.reduce(
    (total, region) => total + region.decisions.length,
    0,
  )

  const filteredRequiredCount = filteredRegions.reduce(
    (total, region) => total + region.decisions.filter(d => d.required).length,
    0,
  )

  // If no decisions match the filters, hide the section
  if (filteredRegions.length === 0) {
    return null
  }

  return (
    <div className="mb-3">
      <Collapsible
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between rounded-md bg-primary/10 px-3 py-2 hover:bg-primary/20">
            <div className="flex flex-col items-start text-left select-none">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{act.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {filteredTotalDecisions} decisions ({filteredRequiredCount}{' '}
                required)
              </span>
            </div>
            <ChevronDown
              className={cn(
                'h-5 w-5 text-muted-foreground transition-transform',
                isOpen && 'rotate-180',
              )}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 space-y-2">
            {filteredRegions.map(region => (
              <SidebarSection
                key={`${act.id}-${region.name}`}
                title={region.name}
                subtitle={`${region.decisions.length} decision${
                  region.decisions.length === 1 ? '' : 's'
                }`}
                showRequired={showRequired}
                showOptional={showOptional}
                showUnavailable={showUnavailable}
                searchTerm={searchTerm}
                decisions={region.decisions}
                badge={{
                  text: `${
                    region.decisions.filter(d => d.required).length
                  } Required`,
                  variant: 'outline',
                }}
                defaultOpen={false}
                // Use regionKey to manage region section state separately
                isOpenExternal={
                  sectionStates &&
                  `region-${act.id}-${region.name}` in sectionStates
                    ? sectionStates[`region-${act.id}-${region.name}`]
                    : false
                }
                onOpenChangeExternal={open => {
                  if (onOpenChangeExternal) {
                    // Instead of calling onOpenChangeExternal directly which would update
                    // the parent's state, we're using a custom event to update only the region state
                    const regionKey = `region-${act.id}-${region.name}`
                    const customEvent = new CustomEvent('regionStateChange', {
                      detail: { regionKey, open },
                    })
                    window.dispatchEvent(customEvent)
                  }
                }}
              />
            ))}
            {regions.length === 0 && (
              <div className="px-2 py-1 text-sm text-muted-foreground">
                No regions found
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

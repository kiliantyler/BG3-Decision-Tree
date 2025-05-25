import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { getDecisionsByActAndRegion } from '@mock/decisions'
import {
  AncientRuins,
  HiddenCamp,
  RescueAdventurer,
} from '@mock/decisions/act1/wilderness/unavailable_example'
import { ScrollArea } from '@ui/scroll-area'
import { useEffect, useState } from 'react'
import { ActSection } from './act-section'
import { LegendArea } from './legend-area'

// Debug helper to ensure our example decisions are accessible
console.log('Example decisions:', {
  HiddenCamp,
  RescueAdventurer,
  AncientRuins,
})

export function AppSidebar() {
  // Filter state
  const [showRequired, setShowRequired] = useState(true)
  const [showOptional, setShowOptional] = useState(true)
  const [showUnavailable, setShowUnavailable] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Section expansion functions
  const [sectionStates, setSectionStates] = useState<Record<string, boolean>>(
    {},
  )

  // Initialize section states on component mount
  useEffect(() => {
    // Set initial state for all sections
    const initialSectionStates = getDecisionsByActAndRegion().reduce(
      (acc, actGroup) => {
        // Set the act section to be open if it's the first one
        acc[`act-${actGroup.act.id}`] = actGroup.act.id === 'act1'

        // Set all region sections within this act to be closed by default
        actGroup.regions.forEach(region => {
          acc[`region-${actGroup.act.id}-${region.name}`] = false
        })

        return acc
      },
      {} as Record<string, boolean>,
    )

    setSectionStates(initialSectionStates)

    // Add event listener for region state changes
    const handleRegionStateChange = (event: Event) => {
      const customEvent = event as CustomEvent
      const { regionKey, open } = customEvent.detail

      setSectionStates(prev => ({
        ...prev,
        [regionKey]: open,
      }))
    }

    window.addEventListener('regionStateChange', handleRegionStateChange)

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('regionStateChange', handleRegionStateChange)
    }
  }, []) // Empty dependency array means this runs once on mount

  const collapseAllSections = () => {
    // Create a copy of current state
    const newSectionStates = { ...sectionStates }

    // Set all sections to collapsed state
    Object.keys(newSectionStates).forEach(key => {
      newSectionStates[key] = false
    })

    setSectionStates(newSectionStates)
  }

  const expandAllSections = () => {
    // Create a copy of current state
    const newSectionStates = { ...sectionStates }

    // Set all sections to expanded state
    Object.keys(newSectionStates).forEach(key => {
      newSectionStates[key] = true
    })

    setSectionStates(newSectionStates)
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader className={cn('items-center')}>
          <span className="center truncate font-semibold">
            BG3 Descision Tree
          </span>
        </SidebarHeader>
        <SidebarGroup>
          <ScrollArea className="h-[calc(100vh-70px)] overflow-hidden select-none">
            <div className="space-y-2 p-2 pr-2 select-none">
              <LegendArea
                showRequired={showRequired}
                setShowRequired={setShowRequired}
                showOptional={showOptional}
                setShowOptional={setShowOptional}
                showUnavailable={showUnavailable}
                setShowUnavailable={setShowUnavailable}
                collapseAllSections={collapseAllSections}
                expandAllSections={expandAllSections}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              {getDecisionsByActAndRegion().map((actGroup, index) => (
                <ActSection
                  key={actGroup.act.id}
                  act={actGroup.act}
                  regions={actGroup.regions}
                  defaultOpen={index === 0} // Only expand the first act by default
                  showRequired={showRequired}
                  showOptional={showOptional}
                  showUnavailable={showUnavailable}
                  searchTerm={searchTerm}
                  // Pass the external control props for expand/collapse functionality
                  isOpenExternal={sectionStates[`act-${actGroup.act.id}`]}
                  onOpenChangeExternal={open => {
                    setSectionStates(prev => ({
                      ...prev,
                      [`act-${actGroup.act.id}`]: open,
                    }))
                  }}
                  // Pass section states for nested regions
                  sectionStates={sectionStates}
                />
              ))}

              {getDecisionsByActAndRegion().length === 0 && (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No decisions found
                </div>
              )}
            </div>
          </ScrollArea>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

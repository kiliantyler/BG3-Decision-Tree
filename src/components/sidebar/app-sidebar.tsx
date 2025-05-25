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
import { useState } from 'react'
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

  const collapseAllSections = () => {
    // We'll track section states for the ActSections
    const actSections = getDecisionsByActAndRegion().reduce(
      (acc, actGroup) => {
        acc[actGroup.act.id] = false
        return acc
      },
      {} as Record<string, boolean>,
    )
    setSectionStates(actSections)
  }

  const expandAllSections = () => {
    // Set all sections to expanded
    const actSections = getDecisionsByActAndRegion().reduce(
      (acc, actGroup) => {
        acc[actGroup.act.id] = true
        return acc
      },
      {} as Record<string, boolean>,
    )
    setSectionStates(actSections)
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

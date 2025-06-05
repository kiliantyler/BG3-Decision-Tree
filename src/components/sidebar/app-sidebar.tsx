import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import * as acts from '@/data/decisions'
import { cn } from '@/lib/utils'
import type { ActType, Decision, Region } from '@/types'
import { ScrollArea } from '@ui/scroll-area'
import { useEffect, useState } from 'react'
import { ActSection } from './act-section'
import { LegendArea } from './legend-area'

// Helper function to get all decisions from an act
const getDecisionsFromAct = (act: ActType): Decision<any>[] => {
  const decisions: Decision<any>[] = []

  // Iterate through act properties to find regions
  Object.entries(act).forEach(([key, value]) => {
    // Skip metadata properties
    if (key === 'name' || key === 'description' || key === 'wikiUrl') {
      return
    }

    const region = value as Region
    if (region && typeof region === 'object' && region.name) {
      // Iterate through region properties to find locations with decisions
      Object.entries(region).forEach(([locKey, locValue]) => {
        // Skip metadata properties
        if (
          locKey === 'name' ||
          locKey === 'description' ||
          locKey === 'wikiUrl'
        ) {
          return
        }

        // Check if it's a location with decisions
        if (locValue && typeof locValue === 'object') {
          // Extract decisions from location
          Object.values(locValue).forEach(item => {
            if (item && typeof item === 'object' && 'options' in item) {
              decisions.push(item as Decision<any>)
            }
          })
        }
      })
    }
  })

  return decisions
}

// Helper function to get decisions organized by act and region
const getDecisionsByActAndRegion = () => {
  const actGroups = []

  // Process Act 1
  if (acts.Act1) {
    const act1Decisions = getDecisionsFromAct(acts.Act1)
    const act1Regions: { name: string; decisions: Decision<any>[] }[] = []

    // Group decisions by region
    Object.entries(acts.Act1).forEach(([key, value]) => {
      if (key === 'name' || key === 'description' || key === 'wikiUrl') {
        return
      }

      const region = value as Region
      if (region && typeof region === 'object' && region.name) {
        const regionDecisions = act1Decisions.filter(d => {
          // Logic to determine if decision belongs to this region
          // This is a placeholder - you'll need to implement proper filtering
          return true
        })

        act1Regions.push({
          name: region.name,
          decisions: regionDecisions,
        })
      }
    })

    actGroups.push({
      act: { id: 'act1', name: acts.Act1.name },
      regions: act1Regions,
    })
  }

  // Process Act 2 (similar to Act 1)
  if (acts.Act2) {
    const act2Regions: { name: string; decisions: Decision<any>[] }[] = []

    // Similar region processing as Act 1
    Object.entries(acts.Act2).forEach(([key, value]) => {
      if (key === 'name' || key === 'description' || key === 'wikiUrl') {
        return
      }

      const region = value as Region
      if (region && typeof region === 'object' && region.name) {
        act2Regions.push({
          name: region.name,
          decisions: [], // Placeholder - need to filter proper decisions
        })
      }
    })

    actGroups.push({
      act: { id: 'act2', name: acts.Act2.name },
      regions: act2Regions,
    })
  }

  // Process Act 3 (similar to Act 1 and 2)
  if (acts.Act3) {
    const act3Regions: { name: string; decisions: Decision<any>[] }[] = []

    // Similar region processing
    Object.entries(acts.Act3).forEach(([key, value]) => {
      if (key === 'name' || key === 'description' || key === 'wikiUrl') {
        return
      }

      const region = value as Region
      if (region && typeof region === 'object' && region.name) {
        act3Regions.push({
          name: region.name,
          decisions: [], // Placeholder - need to filter proper decisions
        })
      }
    })

    actGroups.push({
      act: { id: 'act3', name: acts.Act3.name },
      regions: act3Regions,
    })
  }

  return actGroups
}

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
            BG3 Decision Tree
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

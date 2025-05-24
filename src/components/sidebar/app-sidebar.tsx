import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { getDecisionsByActAndRegion } from '@/data/decisions'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@ui/scroll-area'
import { ActSection } from './act-section'

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader className={cn('items-center')}>
          <span className="center truncate font-semibold">
            BG3 Descision Tree
          </span>
        </SidebarHeader>
        <SidebarGroup>
          <ScrollArea className="h-[calc(100vh-70px)] overflow-hidden">
            <div className="space-y-2 p-2 pr-2">
              {getDecisionsByActAndRegion().map((actGroup, index) => (
                <ActSection
                  key={actGroup.act.id}
                  act={actGroup.act}
                  regions={actGroup.regions}
                  defaultOpen={index === 0} // Only expand the first act by default
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

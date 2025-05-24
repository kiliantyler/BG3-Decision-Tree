import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@ui/scroll-area'
import { DecisionRow } from './decision-row'

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
          <ScrollArea>
            <DecisionRow />
            <DecisionRow />
            <DecisionRow />
          </ScrollArea>
          {/* <DecisionNode
            isAvailable={false}
            item={{ id: 'example-id', label: 'Example Node', optional: true }}
          /> */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
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
          <DecisionRow />
          {/* <DecisionNode
            isAvailable={false}
            item={{ id: 'example-id', label: 'Example Node', optional: true }}
          /> */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

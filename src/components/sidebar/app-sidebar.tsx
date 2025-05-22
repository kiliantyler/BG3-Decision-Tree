import DecisionNode from '@/components/sidebar/DecisionNode'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { DecisionRow } from './decision-row'

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader className={cn('items-center')}>
          <Label>BG3 Descision Tree</Label>
        </SidebarHeader>
        <SidebarGroup>
          <DecisionRow />
          <DecisionNode
            isAvailable={false}
            item={{ id: 'example-id', label: 'Example Node', optional: true }}
          />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

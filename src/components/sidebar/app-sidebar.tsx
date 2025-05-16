import DecisionNode from '@/components/sidebar/DecisionNode'
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar'
import { Label } from '../ui/label'
import { DecisionCard } from './decision-card'

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader className="items-center">
          <Label>BG3 Descision Tree</Label>
        </SidebarHeader>
        <SidebarGroup>
          <DecisionCard />
          <DecisionNode
            isAvailable={false}
            item={{ id: 'example-id', label: 'Example Node', optional: true }}
          />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

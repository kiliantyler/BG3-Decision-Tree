import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar'
import { Label } from '../ui/label'

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader className="items-center">
          <Label>BG3 Descision Tree</Label>
        </SidebarHeader>
        <SidebarGroup>
          <Label>Decision Tree</Label>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

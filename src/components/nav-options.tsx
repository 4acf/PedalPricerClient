import {
  DollarSign,
  Info,
  Trash2,
} from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavOptions({}) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Options</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem key="Clear Canvas">
          <SidebarMenuButton>
              <Trash2 />
              <span>Clear Canvas</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key="Pricing">
          <SidebarMenuButton>
              <DollarSign />
              <span>Pricing</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key="About">
          <SidebarMenuButton>
              <Info />
              <span>About</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

    
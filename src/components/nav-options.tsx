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
        <SidebarMenuButton className="cursor-pointer transition-colors duration-150 ease-in-out hover:text-[#ff6363]">
              <Trash2 />
              <span>Clear Canvas</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key="Pricing">
          <SidebarMenuButton className="cursor-pointer transition-colors duration-150 ease-in-out hover:text-[#00ff94] ">
              <DollarSign />
              <span>Pricing</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key="About">
          <SidebarMenuButton className="cursor-pointer transition-colors duration-150 ease-in-out">
              <Info />
              <span>About</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

    
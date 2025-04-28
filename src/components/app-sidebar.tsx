import * as React from "react"
import {
  BatteryCharging,
  Columns3,
  Info,
  Settings2,
  Smartphone,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavOptions } from "@/components/nav-options"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Pedals",
      icon: Smartphone,
    },
    {
      title: "Pedalboards",
      icon: Columns3,
    },
    {
      title: "Power Supplies",
      icon: BatteryCharging,
    },
  ],
  options: [
    {
      name: "Settings",
      icon: Settings2,
    },
    {
      name: "About",
      icon: Info,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavOptions options={data.options} />
      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

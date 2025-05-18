import * as React from "react"
import {
  BatteryCharging,
  Columns3,
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
import { ItemTypes } from "@/api/models"

const data = {
  navMain: [
    {
      title: "Pedals",
      api: ItemTypes.Pedals,
      singular: "Pedal",
      icon: Smartphone,
    },
    {
      title: "Pedalboards",
      api: ItemTypes.Pedalboards,
      singular: "Pedalboard",
      icon: Columns3,
    },
    {
      title: "Power Supplies",
      api: ItemTypes.PowerSupplies,
      singular: "Power Supply",
      icon: BatteryCharging,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavOptions />
      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

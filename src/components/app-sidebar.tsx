import * as React from "react"
import {
  BatteryCharging,
  Columns3,
  DollarSign,
  Info,
  Settings2,
  Smartphone,
  Trash2,
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
import { ItemTypes } from "@/api/constants"

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
  options: [
    {
      name: "Clear Canvas",
      icon: Trash2,
    },
    {
      name: "Pricing",
      icon: DollarSign,
    },
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

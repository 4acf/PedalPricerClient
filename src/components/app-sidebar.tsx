import * as React from "react"
import {
  BatteryCharging,
  Columns3,
  Gem,
  Smartphone,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavOptions } from "@/components/nav-options"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
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
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-sidebar-accent-foreground">
            <Gem className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Pedal Pricer</span>
            <span className="">v2.0.0</span>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

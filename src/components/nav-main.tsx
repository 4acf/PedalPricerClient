import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { ItemType } from "@/api/models"
import { NavSubmenu } from "./nav-submenu"

export function NavMain({
  items,
}: {
  items: {
    title: string
    api: ItemType
    singular: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}) {

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Add Items</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavSubmenu item={item} key={item.api}></NavSubmenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

import {
  DollarSign,
  Info,
  Settings2,
  Trash2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Switch } from "./ui/switch"
import { DialogClose } from "@radix-ui/react-dialog"
import { useTheme } from "./theme-provider"

export function NavOptions({}) {

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    switch (theme) {
      case "dark":
        setTheme("light");
        break;
      case "light":
      default:
        setTheme("dark");
        break;
    }
  }

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
        <Dialog>
          <DialogTrigger asChild>
            <SidebarMenuItem key="Settings">
              <SidebarMenuButton>
                  <Settings2 />
                  <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-2">
                <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                <Label htmlFor="display-mode">
                  Dark Mode
                </Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="button">Done</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

    
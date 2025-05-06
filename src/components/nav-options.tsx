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
import { useReactFlow } from "@xyflow/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogPortal,
} from "@/components/ui/alert-dialog"
import { useCallback } from "react";

export function NavOptions({}) {

  const { setNodes } = useReactFlow();

  const clearCanvas = useCallback(() => {
    setNodes([]);
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Options</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem key="Clear Canvas">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <SidebarMenuButton  
                className="cursor-pointer transition-colors duration-150 ease-in-out hover:text-[#ff6363]"
              >
                <Trash2 />
                <span>Clear Canvas</span>
              </SidebarMenuButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Canvas?</AlertDialogTitle>
                <AlertDialogDescription>
                  Clearing the canvas will also erase pricing details.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearCanvas}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarMenuItem>
        <SidebarMenuItem key="Pricing">
          <SidebarMenuButton className="cursor-pointer transition-colors duration-150 ease-in-out hover:text-[#00e68a] ">
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

    
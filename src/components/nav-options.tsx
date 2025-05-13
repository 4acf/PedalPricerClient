import {
  CircleHelp,
  DollarSign,
  Info,
  Settings2,
  Trash2,
} from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useReactFlow, useStore } from "@xyflow/react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCallback } from "react";
import { Button } from "./ui/button";
import { PricingMain } from "./pricing-main";

const selector = (s) => {
  return {
    unselectAll: s.unselectNodesAndEdges
  };
};

export function NavOptions({}) {

  const { setNodes } = useReactFlow();

  const clearCanvas = useCallback(() => {
    setNodes([]);
  }, []);

  const { unselectAll } = useStore(selector);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Options</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem key="Clear Canvas">
          <Sheet>
            <SheetTrigger asChild>
              <SidebarMenuButton onClick={unselectAll}  
                className="cursor-pointer transition-colors duration-150 ease-in-out hover:text-[#ff6363]"
              >
                <Trash2 />
                <span>Clear Canvas</span>
              </SidebarMenuButton>
            </SheetTrigger>
            <SheetContent side="top" className="text-xl pb-5 items-center">
              <SheetHeader className="pt-10">
                <SheetTitle>Clear Canvas?</SheetTitle>
                <SheetDescription>
                Clearing the canvas will also erase pricing details.
                </SheetDescription>
              </SheetHeader>
              <SheetFooter className="grid grid-cols-2 gap-5">
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="destructive" onClick={clearCanvas}>Continue</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </SidebarMenuItem>
        <SidebarMenuItem key="Pricing">
          <Sheet>
            <SheetTrigger asChild>
              <SidebarMenuButton onClick={unselectAll}
                className="cursor-pointer transition-colors duration-150 ease-in-out hover:text-[#00e68a] "
              >
                <DollarSign />
                <span>Pricing</span>
              </SidebarMenuButton>
            </SheetTrigger>
            <SheetContent>
              <PricingMain />
            </SheetContent>
          </Sheet>
        </SidebarMenuItem>
        <SidebarMenuItem key="Config">
          <SidebarMenuButton onClick={unselectAll} 
            className="cursor-pointer transition-colors duration-150 ease-in-out"
          >
            <Settings2 />
            <span>Config</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key="Help">
          <SidebarMenuButton onClick={unselectAll} 
            className="cursor-pointer transition-colors duration-150 ease-in-out"
          >
            <CircleHelp />
            <span>Help</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key="About">
          <SidebarMenuButton onClick={unselectAll}
            className="cursor-pointer transition-colors duration-150 ease-in-out"
          >
            <Info />
            <span>About</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

    
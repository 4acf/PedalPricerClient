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
import { ReactFlowState, useReactFlow, useStore } from "@xyflow/react"
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
import { AboutMain } from "./about-main";
import { useHistory } from "@/hooks/use-history";
import { ActionFactory } from "@/factory/action-factory";

const selector = (s: ReactFlowState) => {
  return {
    unselectAll: s.unselectNodesAndEdges
  };
};

export function NavOptions({}) {

  const { getNodes, setNodes } = useReactFlow();
  const appendAction = useHistory((state) => state.appendAction);

  const clearCanvas = useCallback(() => {

    const nodes = getNodes();
    setNodes([]);
    
    const action = ActionFactory.Create(
      () => {
        setNodes(nodes);
      },
      () => {
        setNodes([]);
      },
    );
    appendAction(action);

  }, []);

  const { unselectAll } = useStore(selector);

  const unselector = () => {
    unselectAll();
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Options</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem key="Clear Canvas">
          <Sheet>
            <SheetTrigger asChild>
              <SidebarMenuButton onClick={unselector}  
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
              <SidebarMenuButton onClick={unselector}
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
        <SidebarMenuItem key="About">
          <Sheet>
            <SheetTrigger asChild>
              <SidebarMenuButton onClick={unselector}
                className="cursor-pointer transition-colors duration-150 ease-in-out"
              >
                <Info />
                <span>About</span>
              </SidebarMenuButton>
            </SheetTrigger>
            <SheetContent>
              <AboutMain />
            </SheetContent>
          </Sheet>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

    
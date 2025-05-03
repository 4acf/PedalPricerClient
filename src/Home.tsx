import { AppSidebar } from "@/components/app-sidebar"
import { AppMenubar } from "./components/app-menubar"
import { ReactFlow, Background, BackgroundVariant, useNodesState, applyNodeChanges } from "@xyflow/react"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeProvider } from '@/components/theme-provider'

import '@xyflow/react/dist/style.css';
import { ColorSchemeProvider } from "./components/color-scheme-provider"
import { ItemNode } from "./components/item-node"
import { useCallback, useState } from "react"
import { ItemTypes } from "./api/constants"

const nodeTypes = {
  itemNode: ItemNode,
};
const defaultViewport = { x: 0, y: 0, zoom: 1 };

const inch = 20;

const initialNodes = [
  {
    id: '1',
    type: 'itemNode',
    draggable: true,
    selectable: true,
    data: { itemType: ItemTypes.Pedals, id: "293ff675-5ebf-4e2d-16c5-08dd8226a971"}, 
    position: { x: 0, y: 0 },
    style: { width: 2 * inch, height: 2 * inch },
  },
];

export default function Home() {

  const [nodes, setNodes] = useState(initialNodes);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  return (
    <ThemeProvider>  
      <ColorSchemeProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <AppMenubar />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <ReactFlow 
                  nodes={nodes}
                  nodeTypes={nodeTypes}
                  onNodesChange={onNodesChange}
                  proOptions={{ hideAttribution: true }} 
                  className="rounded-2xl"
                  defaultViewport={defaultViewport}
                >
                  <Background variant={BackgroundVariant.Dots} color="#6b6b6b" />
                </ReactFlow>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ColorSchemeProvider>
    </ThemeProvider>
  )
}
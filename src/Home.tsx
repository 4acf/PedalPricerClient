import { AppSidebar } from "@/components/app-sidebar"
import { AppMenubar } from "./components/app-menubar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeProvider } from '@/components/theme-provider'
import { ColorSchemeProvider } from "./components/color-scheme-provider"
import { ReactFlowWrapper } from "./components/react-flow-wrapper"


export default function Home() {

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
                <ReactFlowWrapper />
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ColorSchemeProvider>
    </ThemeProvider>
  )
}
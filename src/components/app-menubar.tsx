import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useTheme } from "./theme-provider"

export function AppMenubar() {
    
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
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                <MenubarItem>
                    Save<MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator/>
                <MenubarItem>Load</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Theme</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem checked={theme === "dark"} onCheckedChange={toggleTheme}>Dark Mode</MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Color Scheme</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Gray</MenubarItem>
                            <MenubarItem>Neutral</MenubarItem>
                            <MenubarItem>Slate</MenubarItem>
                            <MenubarItem>Stone</MenubarItem>
                            <MenubarItem>Zinc</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )

}
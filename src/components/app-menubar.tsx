import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useTheme } from "./theme-provider"
import { useColorScheme } from "./color-scheme-provider";
import { colorSchemes } from "./color-scheme-provider";
import { capitalizeFirstLetter } from "@/utils/string-formatting";
import { useDisplayConfig } from "@/hooks/use-display-config";

export function AppMenubar() {
    
    const { theme, setTheme } = useTheme(); 
    const { colorScheme, setColorScheme } = useColorScheme();
    const config = useDisplayConfig(); 

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
                    Save
                    <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator/>
                <MenubarItem>Load</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem checked={theme === "dark"} onCheckedChange={toggleTheme}>Dark Mode</MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Color Scheme</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarRadioGroup value={colorScheme} onValueChange={setColorScheme}>
                                {colorSchemes.map((colorScheme) => (
                                    <MenubarRadioItem value={colorScheme.toLowerCase()}>{capitalizeFirstLetter(colorScheme)}</MenubarRadioItem>
                                ))}
                            </MenubarRadioGroup>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarCheckboxItem checked={config.itemBorders} onCheckedChange={config.setItemBorders}>Item Borders</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked={config.infoCards} onCheckedChange={config.setInfoCards}>Info Cards</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked={config.contextMenus} onCheckedChange={config.setContextMenus}>Context Menus</MenubarCheckboxItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )

}
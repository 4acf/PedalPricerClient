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

export function AppMenubar() {
    
    const { theme, setTheme } = useTheme(); 
    const { colorScheme, setColorScheme } = useColorScheme();

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

    const changeColorScheme = (value: string) => {
        console.log(value)
        setColorScheme(value);
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
                            <MenubarRadioGroup value={colorScheme} onValueChange={changeColorScheme}>
                                <MenubarRadioItem value="gray">Gray</MenubarRadioItem>
                                <MenubarRadioItem value="neutral">Neutral</MenubarRadioItem>
                                <MenubarRadioItem value="slate">Slate</MenubarRadioItem>
                                <MenubarRadioItem value="stone">Stone</MenubarRadioItem>
                                <MenubarRadioItem value="zinc">Zinc</MenubarRadioItem>
                            </MenubarRadioGroup>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )

}
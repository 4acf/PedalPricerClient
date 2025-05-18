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
import { NODES_STORAGE_KEY } from "@/utils/constants";
import { useCallback, useEffect, useRef } from "react";
import { Node, useReactFlow } from "@xyflow/react";
import { createNodeCopy } from "@/utils/node-payload";
import { ItemNodeData } from "@/utils/item-node-data";

const downloadFile = () => {

    const blob = new Blob(
        [
            localStorage.getItem(NODES_STORAGE_KEY) ?? "[]",  
        ],
        { type: "application/json" },
    );

    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
        href: url,
        download: "pedal-pricer-export"
    });
    a.click();
    setTimeout(() => {
        URL.revokeObjectURL(url);
        a.remove();
    }, 100);

}

export function AppMenubar() {
    
    const { theme, setTheme } = useTheme(); 
    const { colorScheme, setColorScheme } = useColorScheme();
    const config = useDisplayConfig(); 
    const inputFile = useRef<HTMLInputElement>(null);
    const { addNodes } = useReactFlow();

    const openFileDialog = useCallback(() => {
        if(!inputFile || !inputFile.current)
            return;
        inputFile.current.click();
    },[inputFile]);

    const readFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        if(!file)
            return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const nodes: Node<ItemNodeData>[] = JSON.parse(text) as Node<ItemNodeData>[] ?? [];
            nodes.forEach(node => {
                addNodes(createNodeCopy(node));
            });
        }
        reader.onerror = (e) => {
            console.error("Error reading file:", e);
        }
        reader.readAsText(file);
        event.target.value = '';
        
    },[]);

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

    useEffect(() => {
        const handleKeydownSave = (e: KeyboardEvent) => {
            e.preventDefault();
            if((e.key == 's' || e.key == 'S') && e.ctrlKey){
                downloadFile();
            }
        }
        window.addEventListener('keydown', handleKeydownSave);
        return () => {
            window.removeEventListener('keydown', handleKeydownSave);
        };
    }, []);

    return (
        <>
            <input type="file" ref={inputFile} style={{display: "none"}} onChange={readFile} />
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                    <MenubarItem onClick={downloadFile}>
                        Save
                        <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator/>
                    <MenubarItem onClick={openFileDialog}>
                        Load
                    </MenubarItem>
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
        </>
    )

}
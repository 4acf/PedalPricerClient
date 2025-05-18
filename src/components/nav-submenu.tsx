import { ChevronRight, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ItemType } from "@/api/models"
import { useCallback, useEffect, useState } from "react"
import { ItemPreview } from "@/api/models"
import { GetInfo, GetItems } from "@/api/api"
import { useReactFlow } from "@xyflow/react"  
import { createDefaultNode } from "@/utils/node-payload"

type BrandOption = {
    label: string,
    options: ItemPreview[],
}

export function NavSubmenu({
    item,
}: {
    item: {
        title: string
        api: ItemType
        singular: string
        icon?: LucideIcon
        isActive?: boolean
    }
}) {

    const [open, setOpen] = useState<boolean>(false);
    const [label, setLabel] = useState<string>("");
    const [selectedID, setSelectedID] = useState<string>("");
    const [brandOptions, setBrandOptions] = useState<BrandOption[]>([]);
    const { addNodes } = useReactFlow();

    const addItem = useCallback(async () => {

        if(selectedID === "")
            return;

        const items = await GetItems(item.api, [selectedID]);
        items.forEach(element => {
            addNodes(createDefaultNode(element, item.api));
        });

    }, [selectedID]);

    useEffect(() => {
        const GetItemPreviews = async () => {
            try{
                const itemPreviewMap = new Map<string, ItemPreview[]>();
                const itemPreviewData = await GetInfo(item.api);
                itemPreviewData.forEach(itemPreview => {
                    let values = itemPreviewMap.get(itemPreview.brand);
                    if (values) {
                        values.push(itemPreview);
                    }
                    else {
                        itemPreviewMap.set(itemPreview.brand, [itemPreview]);
                    }
                });
                const groupedOptions: BrandOption[] = [];
                for (const [key, value] of itemPreviewMap){
                    groupedOptions.push({
                        label: key,
                        options: value
                    })
                }
                setBrandOptions(groupedOptions);
            }   
            catch (error){
                console.error(error);
            }
        };
        GetItemPreviews();
    },[]);

    return (
        <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className="cursor-pointer transition-colors duration-150 ease-in-out">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub className="py-4">
                        <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[254px] justify-between overflow-hidden"
                            >
                                <span className="truncate opacity-50 font-normal">
                                    {
                                        label ? label
                                        : "Select..."
                                    }
                                </span>
                                <ChevronRight className="opacity-25 shrink-0 ml-2" />
                            </Button>
                        </PopoverTrigger>
                            <PopoverContent className="w-[254px] p-0">
                                <Command
                                    filter={(value, search) => {
                                        if (value.toLowerCase().includes(search.toLowerCase())) return 1;
                                        return 0;
                                    }}
                                >
                                    <CommandInput placeholder="Search items..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No items found.</CommandEmpty>
                                        {brandOptions.map((brandOption) => (
                                            <CommandGroup heading={brandOption.label} key={brandOption.label}>
                                            {brandOption.options.map((option) => (
                                                <CommandItem
                                                    key={option.id}
                                                    value={`${option.brand} ${option.name}`}
                                                    onSelect={(currentValue) => {
                                                        setLabel(currentValue === label ? "" : `${option.brand} ${option.name}`)
                                                        setSelectedID(currentValue === label ? "" : option.id)
                                                        setOpen(false)
                                                    }}
                                                >
                                                {option.brand} {option.name}
                                                </CommandItem>
                                            ))}
                                            </CommandGroup>
                                        ))}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <Button variant="outline" className="mt-1 mb-1" onClick={addItem}>Add {item.singular}</Button>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )

}
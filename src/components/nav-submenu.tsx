import { ChevronRight, type LucideIcon } from "lucide-react"
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
import { ItemType } from "@/api/models"
import { useEffect, useState } from "react"
import { ItemPreview } from "@/api/models"
import { GetInfo } from "@/api/api"
import { VirtualizedCombobox } from "./virtualized-combobox"

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

    const [brandOptions, setBrandOptions] = useState<BrandOption[]>([]);
    const [flattenedOptions, setFlattenedOptions] = useState<ItemPreview[]>([]);

    useEffect(() => {
        const GetItemPreviews = async () => {
            try{
                const itemPreviewMap = new Map<string, ItemPreview[]>();
                const itemPreviewData = await GetInfo(item.api);
                setFlattenedOptions(itemPreviewData);
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
                    <SidebarMenuSub>
                        <VirtualizedCombobox api={item.api} options={flattenedOptions} singular={item.singular}/>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )

}
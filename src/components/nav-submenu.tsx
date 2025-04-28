import { ChevronRight, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import { ItemType } from "@/api/constants"
import { useEffect, useState } from "react"
import { ItemPreview } from "@/api/models"
import { GetInfo } from "@/api/api"

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
            <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
            <SidebarMenuSub className="py-4">
                <Select>
                <SelectTrigger className="w-[254px]">
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    {brandOptions.map((brandOption) => (
                        <SelectGroup>
                            <SelectLabel>{brandOption.label}</SelectLabel>
                            {brandOption.options.map((option) => (
                                <SelectItem value={option.id}>{option.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    ))}
                </SelectContent>
                </Select>
                <Button variant="outline" className="mt-1 mb-1">Add {item.singular}</Button>
            </SidebarMenuSub>
            </CollapsibleContent>
        </SidebarMenuItem>
        </Collapsible>
    )

}
import { baseUrl, ItemType } from "@/api/constants";
import { Item } from "@/api/models";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { INCH } from "@/utils/constants";
import clsx from "clsx";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type ItemNodeProps = {
    itemType: ItemType,
    item: Item,
}

export function ItemNode({ data, selected } : { data: ItemNodeProps, selected: boolean }) {

    const [hovered, setHovered] = useState<boolean>(false);

    const handleMouseIn = () => {
        setHovered(true);
    };

    const handleMouseOut = () => {
        setHovered(false);
    };

    const item = data.item;

    return (
        <HoverCard open={selected || hovered} openDelay={50} closeDelay={50}>
            <HoverCardTrigger asChild>
                <div
                    className={clsx(
                        'border rounded transition-colors duration-200 p-[2px]',
                        selected ? 'border-[#3f85eb]' : 'border-transparent',
                        selected ? 'hover:border-[#3f85eb]' : 'hover:border-[rgb(63,133,235,0.5)]',
                    )}
                    onMouseEnter={handleMouseIn}
                    onMouseLeave={handleMouseOut}
                >
                    <img 
                        src={`${baseUrl}/${data.itemType}/${item.id}/image`}
                        style={
                            {
                                width: item.width * INCH,
                                height: item.height * INCH,
                            }
                        }
                    />
                </div>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{item.brand} {item.name}</h4>
                    <ul>
                        <li>
                            <p className="text-sm">Dimensions: {item.width}in x {item.height}in</p>
                        </li>
                        <li>
                            <p className="text-sm">Price: $ -</p>
                        </li>
                    </ul>
                </div>
            </HoverCardContent>
        </HoverCard>
    )

}
import { baseUrl, ItemType } from "@/api/constants";
import { Item } from "@/api/models";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { INCH } from "@/utils/constants";
import clsx from "clsx";

type ItemNodeProps = {
    itemType: ItemType,
    item: Item,
}

export function ItemNode({ data, selected } : { data: ItemNodeProps, selected: boolean }) {

    const item = data.item;

    return (
        <HoverCard openDelay={50} closeDelay={50}>
            <HoverCardTrigger asChild>
                <div
                    className={clsx(
                        'border rounded hover:border-[#3f85eb] transition-colors duration-200 p-[2px]',
                        selected ? 'border-[#3f85eb]' : 'border-transparent'
                    )}
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
import { ItemType } from "@/api/constants"
import { Item } from "@/api/models"
import { INCH } from "./constants"

export type NodePayload = {
    id: string,
    type: string,
    draggable: boolean,
    selectable: boolean,
    data: { 
        itemType: ItemType,
        item: Item,
    }, 
    position: {
        x: number,
        y: number, 
    },
    style: { 
        width: number, 
        height: number,
        filter: string,
    },
}

export function convertItemToNodePayload(item: Item, itemType: ItemType): NodePayload {

    const nodePayload = {
        id: crypto.randomUUID(),
        type: 'itemNode',
        draggable: true,
        selectable: true,
        data: {
            itemType: itemType,
            item: item,
        },
        position: {
            x: 0,
            y: 0,
        },
        style: {
            width: item.width * INCH,
            height: item.height * INCH,
            filter: 'drop-shadow(rgb(0, 0, 0, 0.5) 5px 5px 3px)',
        }
    }

    return nodePayload;

}
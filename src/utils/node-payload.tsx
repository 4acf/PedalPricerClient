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
        id: string,
    }, 
    position: {
        x: number,
        y: number, 
    },
    style: { 
        width: number, 
        height: number 
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
            id: item.id,
        },
        position: {
            x: 0,
            y: 0,
        },
        style: {
            width: item.width * INCH,
            height: item.height * INCH,
        }
    }

    return nodePayload;

}
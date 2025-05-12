import { ItemType } from "@/api/constants"
import { Item } from "@/api/models"
import { XYPosition } from "@xyflow/react";

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
        filter: string,
    },
}

export function convertItemToNodePayload(item: Item, itemType: ItemType, position?: XYPosition): NodePayload {

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
            x: position?.x || 0,
            y: position?.y || 0,
        },
        style: {
            filter: 'drop-shadow(rgb(0, 0, 0, 0.5) 5px 5px 3px)',
        }
    }

    return nodePayload;

}
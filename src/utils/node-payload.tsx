import { ItemType } from "@/api/constants"
import { Item } from "@/api/models"
import { Node } from "@xyflow/react";
import { ItemNodeData } from "./item-node-data";

export type NodePayload = {
    id: string,
    type: string,
    draggable: boolean,
    selectable: boolean,
    data: ItemNodeData,
    position: {
        x: number,
        y: number, 
    },
    style: { 
        filter: string,
    },
}

export function createDefaultNode(item: Item, itemType: ItemType): NodePayload {

    const nodePayload: NodePayload = {
        id: crypto.randomUUID(),
        type: 'itemNode',
        draggable: true,
        selectable: true,
        data: {
            itemType: itemType,
            item: item,
            price: 0,
            include: true,
        },
        position: {
            x: 0,
            y: 0,
        },
        style: {
            filter: 'drop-shadow(rgb(0, 0, 0, 0.5) 5px 5px 3px)',
        }
    }

    return nodePayload;

}

export function createNodeCopy(node: Node<ItemNodeData>): NodePayload {

    const nodePayload: NodePayload = {
        id: crypto.randomUUID(),
        type: 'itemNode',
        draggable: true,
        selectable: true,
        data: {
            itemType: node.data.itemType,
            item: node.data.item,
            price: node.data.price,
            include: node.data.include,
        },
        position: node.position,
        style: {
            filter: 'drop-shadow(rgb(0, 0, 0, 0.5) 5px 5px 3px)',
        }
    }

    return nodePayload;

}
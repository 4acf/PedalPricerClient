import { Item, ItemType } from "@/api/models"

export type ItemNodeData = {
    itemType: ItemType,
    item: Item,
    price: number,
    include: boolean,
    rotation: number,
}
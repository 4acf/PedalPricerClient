import { ItemType } from "@/api/constants"
import { Item } from "@/api/models"

export type ItemNodeData = {
    itemType: ItemType,
    item: Item,
    price: number,
    include: boolean,
}
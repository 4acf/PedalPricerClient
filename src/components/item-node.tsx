import { baseUrl, ItemType } from "@/api/constants";

type ItemNodeProps = {
    itemType: ItemType,
    id: string,
}

export function ItemNode({ data } : { data: ItemNodeProps }) {

    return (
        <img src={`${baseUrl}/${data.itemType}/${data.id}/image`} />
    )

}
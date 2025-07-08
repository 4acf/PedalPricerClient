import { baseUrl } from "./constants";
import { Item, ItemPreview, ItemType } from "./models";

export const GetInfo = async (itemType: ItemType) : Promise<ItemPreview[]> => {

    const response: Response = await fetch(`${baseUrl}/${itemType}/info`, {
        method: "GET"
    });
    if(!response.ok){
        throw new Error(`${response.status} error: ${response.statusText}`);
    }
    const data = await response.json();
    return data as ItemPreview[];
}

export const GetItem = async (itemType: ItemType, id: string) : Promise<Item> => {
    const response: Response = await fetch(`${baseUrl}/${itemType}/${id}`, {
        method: "GET"
    });
    if(!response.ok){
        throw new Error(`${response.status} error: ${response.statusText}`);
    }
    const data = await response.json();
    return data as Item;
}

export const GetImage = async (itemType: ItemType, ID: string) : Promise<Blob> => {
    const response: Response = await fetch(`${baseUrl}/${itemType}/${ID}/image`, {
        method: "GET"
    });
    if(!response.ok){
        throw new Error(`${response.status} error: ${response.statusText}`);
    }
    const data: Blob = await response.blob();
    return data;
}
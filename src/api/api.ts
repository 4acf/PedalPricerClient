import { baseUrl } from "./constants";
import { Item, ItemPreview, ItemType } from "./models";

export const GetInfo = async (itemType: ItemType) : Promise<ItemPreview[]> => {

    try{
        const response: Response = await fetch(`${baseUrl}/${itemType}/info`, {
            method: "GET"
        });
        if(!response.ok){
            throw new Error(`${response.status} error: ${response.statusText}`);
        }
        const data = await response.json();
        return data as ItemPreview[];
    }
    catch (error){
        throw error;
    }

}

export const GetItem = async (itemType: ItemType, id: string) : Promise<Item> => {

    try{
        const response: Response = await fetch(`${baseUrl}/${itemType}/${id}`, {
            method: "GET"
        });
        if(!response.ok){
            throw new Error(`${response.status} error: ${response.statusText}`);
        }
        const data = await response.json();
        return data as Item;
    }
    catch (error){
        throw error;
    }

}

export const GetImage = async (itemType: ItemType, ID: string) : Promise<Blob> => {

    try{
        const response: Response = await fetch(`${baseUrl}/${itemType}/${ID}/image`, {
            method: "GET"
        });
        if(!response.ok){
            throw new Error(`${response.status} error: ${response.statusText}`);
        }
        const data: Blob = await response.blob();
        return data;
    }
    catch (error){
        throw error;
    }

}
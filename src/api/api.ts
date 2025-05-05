import { baseUrl, ItemType } from "./constants";
import { Item, ItemPreview } from "./models";

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

//the ui components are not set up for this currently, but the api is set up for passing in multiple IDs at a time
export const GetItems = async (itemType: ItemType, IDs: string[]) : Promise<Item[]> => {

    let concatenatedIDs: string = "";
    for(const ID of IDs){
        concatenatedIDs += `${ID},`;
    }
    concatenatedIDs = concatenatedIDs.slice(0, -1);

    const params = new URLSearchParams({
        rawIDs: concatenatedIDs,
    });

    try{
        const response: Response = await fetch(`${baseUrl}/${itemType}?${params}`, {
            method: "GET"
        });
        if(!response.ok){
            throw new Error(`${response.status} error: ${response.statusText}`);
        }
        const data = await response.json();
        return data as Item[];
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
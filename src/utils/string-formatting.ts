import { ItemType } from "@/api/models";

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formalizeItemType(itemType: ItemType): string {
    switch(itemType){
        case "pedals":
            return "Pedal";
        case "pedalboards":
            return "Pedalboard";
        case "powersupplies":
            return "Power Supply";
        default:
            return "Item";
    }
}

export function toUSD(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}
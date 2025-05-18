export type ItemPreview = {
    id: string,
    brand: string,
    name: string,
}

export type Item = ItemPreview & {
    width: number,
    height: number,
    filename: string,
}

//used for determining which endpoint to reach
export type ItemType = "pedals" | "pedalboards" | "powersupplies";

//used because i like passing enum values instead of raw strings
export enum ItemTypes {
    Pedals = "pedals",
    Pedalboards = "pedalboards",
    PowerSupplies = "powersupplies",
}
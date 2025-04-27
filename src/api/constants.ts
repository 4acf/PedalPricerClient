export const baseUrl: string = "https://localhost:7263";

//used for determining which endpoint to reach
export type ItemType = "pedals" | "pedalboards" | "powersupplies";

//used because i like passing enum values instead of raw strings
export enum ItemTypes {
    Pedals = "pedals",
    Pedalboards = "pedalboards",
    PowerSupplies = "powersupplies",
}
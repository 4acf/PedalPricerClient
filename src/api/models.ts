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
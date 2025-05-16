import { create } from 'zustand'

type DisplayConfig = {
    itemBorders: boolean,
    infoCards: boolean,
    contextMenus: boolean,
    setItemBorders: () => void,
    setInfoCards: () => void,
    setContextMenus: () => void,
}

export const useDisplayConfig = create<DisplayConfig>((set) => ({
    itemBorders: true,
    infoCards: true,
    contextMenus: true,
    setItemBorders: () => set((state) => ({itemBorders: !state.itemBorders})),
    setInfoCards: () => set((state) => ({infoCards: !state.infoCards})),
    setContextMenus: () => set((state) => ({contextMenus: !state.contextMenus})),
}));
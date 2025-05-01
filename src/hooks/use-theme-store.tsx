import { Theme, ThemeNames, Themes } from '@/utils/colors'
import { create } from 'zustand'

export interface ThemeStore {
    theme: Theme,
    changeTheme: (themeName: ThemeNames) => void,
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: Themes[ThemeNames.Slate],
    changeTheme: (themeName) => set(() => ({
        theme: Themes[themeName],
    })),
}))
import { Mode, Theme, ThemeNames, Themes } from '@/utils/colors'
import { create } from 'zustand'

export interface ThemeStore {
    theme: Theme,
    mode: Mode,
    changeTheme: (themeName: ThemeNames) => void,
    toggleMode: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: Themes[ThemeNames.Slate],
    mode: Mode.Dark,
    changeTheme: (themeName) => set(() => ({
        theme: Themes[themeName],
    })),
    toggleMode: () => set((state) => ({
        mode: state.mode === Mode.Light ? Mode.Dark : Mode.Light, 
    })),
}))
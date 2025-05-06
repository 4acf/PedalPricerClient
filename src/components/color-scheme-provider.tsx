import { createContext, useContext, useEffect, useState } from "react"
 
export const colorSchemes = ["emerald", "gray", "indigo", "neutral", "slate", "stone", "teal", "violet", "zinc"];
 
type ColorScheme = typeof colorSchemes[number];

type ColorSchemeProviderProps = {
  children: React.ReactNode
  defaultColorScheme?: ColorScheme 
  storageKey?: string
}
 
type ColorSchemeProviderState = {
  colorScheme: ColorScheme
  setColorScheme: (colorScheme: ColorScheme) => void
}
 
const initialState: ColorSchemeProviderState = {
  colorScheme: "slate",
  setColorScheme: () => null,
}
 
const ColorSchemeProviderContext = createContext<ColorSchemeProviderState>(initialState)
 
export function ColorSchemeProvider({
  children,
  defaultColorScheme = "slate",
  storageKey = "pedal-pricer-ui-color-scheme",
  ...props
}: ColorSchemeProviderProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    () => (localStorage.getItem(storageKey) as ColorScheme) || defaultColorScheme
  )
 
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(...colorSchemes.map((scheme) => `scheme-${scheme}`)); 
    root.classList.add(`scheme-${colorScheme}`);
  }, [colorScheme])
 
  const value = {
    colorScheme,
    setColorScheme: (colorScheme: ColorScheme) => {
      localStorage.setItem(storageKey, colorScheme)
      setColorScheme(colorScheme)
    },
  }
 
  return (
    <ColorSchemeProviderContext.Provider {...props} value={value}>
      {children}
    </ColorSchemeProviderContext.Provider>
  )
}
 
export const useColorScheme = () => {
  const context = useContext(ColorSchemeProviderContext)
 
  if (context === undefined)
    throw new Error("useColorScheme must be used within a ColorSchemeProvider")
 
  return context
}
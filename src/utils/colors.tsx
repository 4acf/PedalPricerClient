//mappings for the default shadcn themes so i can reference them in non-tailwind contexts

export enum Mode {
    Light = "light",
    Dark = "dark"
}

export enum Property {
    Background = "background",
    Foreground = "foreground",
    Card = "card",
    CardForeground = "card-foreground",
    Popover = "popover",
    PopoverForeground = "popover-foreground",
    Primary = "primary",
    PrimaryForeground = "primary-foreground",
    Secondary = "secondary",
    SecondaryForeground = "secondary-foreground",
    Muted = "muted",
    MutedForeground = "muted-foreground",
    Accent = "accent",
    AccentForeground = "accent-foreground",
    Destructive = "destructive",
    Border = "border",
    Input = "input",
    Ring = "ring",
    Chart1 = "chart-1",
    Chart2 = "chart-2",
    Chart3 = "chart-3",
    Chart4 = "chart-4",
    Chart5 = "chart-5",
    Sidebar = "sidebar",
    SidebarForeground = "sidebar-foreground",
    SidebarPrimary = "sidebar-primary",
    SidebarPrimaryForeground = "sidebar-primary-foreground",
    SidebarAccent = "sidebar-accent",
    SidebarAccentForeground = "sidebar-accent-foreground",
    SidebarBorder = "sidebar-border",
    SidebarRing = "sidebar-ring",
    Dots = "dots",
}

export enum ThemeNames {
    Stone = "stone",
    Zinc = "zinc",
    Neutral = "neutral",
    Gray = "gray",
    Slate = "slate",
}

export type Theme = {
    [key in Property]: {
        [key in Mode]: string
    }
}

export type SelectableThemes = {
    [key in ThemeNames]: Theme
}

export const Slate: Theme = {
    "background": { "light": "#ffffff", "dark": "#020618" },
    "foreground": { "light": "#020618", "dark": "#f8fafc" },
    "card": { "light": "#ffffff", "dark": "#0f172b" },
    "card-foreground": { "light": "#020618", "dark": "#f8fafc" },
    "popover": { "light": "#ffffff", "dark": "#0f172b" },
    "popover-foreground": { "light": "#020618", "dark": "#f8fafc" },
    "primary": { "light": "#0f172b", "dark": "#e2e8f0" },
    "primary-foreground": { "light": "#f8fafc", "dark": "#0f172b" },
    "secondary": { "light": "#f1f5f9", "dark": "#1d293d" },
    "secondary-foreground": { "light": "#0f172b", "dark": "#f8fafc" },
    "muted": { "light": "#f1f5f9", "dark": "#1d293d" },
    "muted-foreground": { "light": "#62748e", "dark": "#90a1b9" },
    "accent": { "light": "#f1f5f9", "dark": "#1d293d" },
    "accent-foreground": { "light": "#0f172b", "dark": "#f8fafc" },
    "destructive": { "light": "#e7000b", "dark": "#ff6467" },
    "border": { "light": "#e2e8f0", "dark": "rgba(255, 255, 255, 0.1)" },
    "input": { "light": "#e2e8f0", "dark": "rgba(255, 255, 255, 0.15)" },
    "ring": { "light": "#90a1b9", "dark": "#6a7282" },
    "chart-1": { "light": "#f54a00", "dark": "#1447e6" },
    "chart-2": { "light": "#009689", "dark": "#00bc7d" },
    "chart-3": { "light": "#104e64", "dark": "#fd9a00" },
    "chart-4": { "light": "#ffba00", "dark": "#ad46ff" },
    "chart-5": { "light": "#fd9a00", "dark": "#ff2056" },
    "sidebar": { "light": "#f8fafc", "dark": "#0f172b" },
    "sidebar-foreground": { "light": "#020618", "dark": "#f8fafc" },
    "sidebar-primary": { "light": "#0f172b", "dark": "#1447e6" },
    "sidebar-primary-foreground": { "light": "#f8fafc", "dark": "#f8fafc" },
    "sidebar-accent": { "light": "#f1f5f9", "dark": "#1d293d" },
    "sidebar-accent-foreground": { "light": "#0f172b", "dark": "#f8fafc" },
    "sidebar-border": { "light": "#e2e8f0", "dark": "rgba(255, 255, 255, 0.1)" },
    "sidebar-ring": { "light": "#90a1b9", "dark": "#6a7282" },
    "dots": { "light": "#a1a1aa", "dark": "#3d4d6c" }
    //"dots": { "light": "#ff0000", "dark": "#00ff00" },
};

export const Themes: SelectableThemes = {
    "stone": Slate,
    "zinc": Slate,
    "neutral": Slate,
    "gray": Slate,
    "slate": Slate,
}

export function ResolveColor(theme: Theme, property: Property, mode: Mode) : string {
    return theme[property][mode];
}
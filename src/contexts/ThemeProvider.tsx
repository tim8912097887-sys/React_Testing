import { createContext, useContext, useState, type PropsWithChildren } from "react";

type ContextValue = {
    theme: "light" | "dark"
    setDarkMode: () => void
    setLightMode: () => void
}

const ThemeContext = createContext<ContextValue | null>(null);

const ThemeProvider = ({ children }:PropsWithChildren) => {

    const [theme,setDarkTheme] = useState<"light" | "dark">("light");

    // switch function
    const setDarkMode = () => setDarkTheme("dark");
    const setLightMode = () => setDarkTheme("light");

  return (
    <ThemeContext value={{ setDarkMode,setLightMode,theme }}>
       {children}
    </ThemeContext>
  )
}

export default ThemeProvider

// export custom hook to use the context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    // If not use inside context provider,throw error
    if(!context) throw new Error("Pleas use inside context provider");
    return context;
}
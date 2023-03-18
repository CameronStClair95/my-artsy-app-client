import { createContext, useState } from "react";

const ThemeContext = createContext()

function ThemeProviderWrapper(props){
    const [theme, setTheme] = useState("light")

    function toggleTheme(){
        if (theme === "light"){ setTheme("dark") }
        else { setTheme("light")}
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeProviderWrapper}
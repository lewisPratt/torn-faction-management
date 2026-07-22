import { useState } from "react"
import ClearKeyButton from "./components/ClearKeyButton"
import type { LayoutProps } from "./interfaces"
import DarkMode from "./components/DarkMode"


function Layout({ children, handleClearKey }: LayoutProps) {

    const [darkMode, setDarkMode] = useState<boolean>(false)
     let toggleButton = ""
     
    function switchMode() {
        if (document.documentElement.getAttribute("data-theme") === "light") {
            document.documentElement.setAttribute("data-theme", "dark")
            setDarkMode(true)
        } else {
            document.documentElement.setAttribute("data-theme", "light")
            setDarkMode(false)
        }
    }
   
    if (document.documentElement.getAttribute("data-theme") === "light") {
        toggleButton = "bi bi-toggle-off"
    } else {
        toggleButton = "bi bi-toggle-on"
    }
    return (
        <>

            {children}

            <footer>
                <ClearKeyButton handleClearKey={handleClearKey} />
                <a href="https://github.com/lewisPratt/torn-faction-management/issues" target="_blank"><button>Bugs & Feature Requests</button></a>
                <a href="https://buymeacoffee.com/lewis19880g" target="_blank"><button>Buy me a Coffee!</button></a>
                <DarkMode />


            </footer>
        </>
    )
}

export default Layout
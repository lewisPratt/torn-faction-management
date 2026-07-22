import { useState } from "react"

function DarkMode(){
 const [_darkMode, setDarkMode] = useState<boolean>(false)
     let toggleButton = ""
     
    function switchMode() {
        if (document.documentElement.getAttribute("data-theme") === "light") {
            document.documentElement.setAttribute("data-theme", "dark")
            localStorage.setItem("theme", "dark")
            setDarkMode(true)
        } else {
            document.documentElement.setAttribute("data-theme", "light")
            localStorage.setItem("theme", "light")
            setDarkMode(false)
        }
    }
   
    if (document.documentElement.getAttribute("data-theme") === "light") {
        toggleButton = "bi bi-toggle-off"
    } else {
        toggleButton = "bi bi-toggle-on"
    }
    return(
        <button onClick={switchMode}><i className={toggleButton}></i> Dark Mode</button>
    )

}

export default DarkMode
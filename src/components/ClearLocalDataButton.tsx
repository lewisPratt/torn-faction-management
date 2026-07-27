
import type { Dispatch, SetStateAction } from "react"

interface clearLocalProps{
    setHasCleared: Dispatch<SetStateAction<boolean>>
}

function ClearLocalDataButton({setHasCleared} : clearLocalProps) {
    
    
    const buttonText = localStorage.getItem("localLogs") ? "Clear Local Data" : "No Local Data"

   
    function removeLocalData() {

        if (!localStorage.getItem("localLogs"))
            return 
           

        localStorage.removeItem("localLogs")
        setHasCleared(prev => !prev)

    }


    return (
        <>
            <button onClick={removeLocalData}>{buttonText}</button>
        </>

    )
}

export default ClearLocalDataButton
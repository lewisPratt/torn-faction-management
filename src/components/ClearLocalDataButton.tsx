
import type { Dispatch, SetStateAction } from "react"
import { Tooltip } from "react-tooltip"

interface clearLocalProps{
    setLocalDataChange: Dispatch<SetStateAction<boolean>>
    
}

function ClearLocalDataButton({setLocalDataChange} : clearLocalProps) {
    
    
    const buttonText = localStorage.getItem("localLogs") ? "Clear Local Data" : "No Local Data"

   
    function removeLocalData() {

        if (!localStorage.getItem("localLogs"))
            return 
           

        localStorage.removeItem("localLogs")
        setLocalDataChange(prev => !prev)
      

    }


    return (
        <>
            <button  data-tooltip-id="clear-data-button-tooltip" data-tooltip-content="Remove ALL faction member data stored locally." data-tooltip-place="right" onClick={removeLocalData}>{buttonText}</button>
            <Tooltip id="clear-data-button-tooltip"/>
        </>

    )
}

export default ClearLocalDataButton
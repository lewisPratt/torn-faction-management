import type { ClearKeyProps
    
 } from "../interfaces"
function ClearKeyButton({handleClearKey} : ClearKeyProps){
    return(
        
            <button onClick={handleClearKey}>Clear API Key</button>
        
    )
}

export default ClearKeyButton
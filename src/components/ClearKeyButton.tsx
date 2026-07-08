import type { ClearKeyProps
    
 } from "../interfaces"
function ClearKeyButton({handleClearKey} : ClearKeyProps){
    return(
        <div>
            <button onClick={handleClearKey}>Clear API Key</button>
        </div>
    )
}

export default ClearKeyButton
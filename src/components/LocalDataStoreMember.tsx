import type { SetStateAction, Dispatch } from "react"
import type { warObject } from "../interfaces"

interface localStoreProps {
    warObject: warObject
    memberId: number
    warId: number
    setHasSaved: Dispatch<SetStateAction<boolean>>

}

function LocalDataStoreMember({ memberId, warId, warObject, setHasSaved }: localStoreProps) {
    const localLogs = localStorage.getItem("localLogs")

    function storeLocal() {
        //if overall memberslog item is present in local storage

        if (localLogs) {
            //parse the string value back into JS object
            const parsedLogs = JSON.parse(localLogs)

            console.log("A: Parsed Logs", parsedLogs)
            if (Object.keys(parsedLogs).includes(memberId.toString())) {

                console.log("this member is stored")

                const thisMembersLogs = parsedLogs[memberId]

                if (Object.keys(thisMembersLogs).includes(warId.toString())) {

                    console.log("this war is already stored, dont store it again")
                } else {

                    console.log("war not stored yet, store it now.")
                    parsedLogs[memberId] = { ...parsedLogs[memberId], ...warObject }
                    localStorage.setItem("localLogs", JSON.stringify(parsedLogs))
                    setHasSaved(true)

                }
                console.log("B: member logs", thisMembersLogs)

            }
            else {
                console.log("this member is not stored")
                const newlyLogged = { ...parsedLogs, [memberId]: warObject }

                localStorage.setItem("localLogs", JSON.stringify(newlyLogged))
                setHasSaved(true)
            }

        }

        else {
            console.log("member logs not present")

            const memberObject = { [memberId]: warObject }
            const convertedData = JSON.stringify(memberObject)
            localStorage.setItem("localLogs", convertedData)
            setHasSaved(true)
        }
    }
    //needs refactoring to fit DRY - but working in current state
    let alreadyDownloaded : boolean = false
    if (localLogs) {


        const parsedLogs = JSON.parse(localLogs)
        if (Object.keys(parsedLogs).includes(memberId.toString())) {
            //member is stored locally now check if war is
            if (Object.keys(parsedLogs[memberId]).includes(warId.toString())) {
                alreadyDownloaded = true
            }
            else {
                alreadyDownloaded = false
            }
        }
    }

    return (
        <>
        {alreadyDownloaded ?  <span data-tooltip-id="more-info-tooltip" data-tooltip-content="Already stored." data-tooltip-place="bottom" ><i className="bi bi-check-square"></i> </span>  
        :  <span data-tooltip-id="more-info-tooltip" data-tooltip-content="Store war performance locally" data-tooltip-place="bottom" onClick={storeLocal}><i className="bi bi-box-arrow-down"></i> </span> }
        
        </>
    )

}

export default LocalDataStoreMember
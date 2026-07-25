import type { SetStateAction, Dispatch } from "react"

interface localStoreProps{
    memberData: object
    warObject: object
    memberId: number
    warId: number
    setState: Dispatch<SetStateAction<boolean>>

}

function LocalDataStoreMember({memberData,memberId, warId,warObject,setState} : localStoreProps) {
    
    function storeLocal() {
        // console.log(warObject)
        //if overall memberslog item is present in local storage
        if (localStorage.getItem("memberLogs")) {

            //grab the memberslog item 
            const loggedMembers = localStorage.getItem("memberLogs")

            if (loggedMembers) {
                //parse the string value back into JS object
                const parsedLogs = JSON.parse(loggedMembers)

                console.log("A: Parsed Logs", parsedLogs)
                if (Object.keys(parsedLogs).includes(memberId.toString())) {

                    console.log("this member is stored")

                    const thisMembersLogs = parsedLogs[memberId]

                    if (Object.keys(thisMembersLogs).includes(warId.toString())) {

                        console.log("this war is already stored, dont store it again")
                    } else {

                        console.log("war not stored yet, store it now.")
                        parsedLogs[memberId] = { ...parsedLogs[memberId], [warId]: memberData }
                        localStorage.setItem("memberLogs", JSON.stringify(parsedLogs))
                        setState(true)

                    }
                    console.log("B: member logs", thisMembersLogs)

                }
                else {
                    console.log("this member is not stored")
                    const newlyLogged = { ...parsedLogs, [memberId]: warObject }

                    localStorage.setItem("memberLogs", JSON.stringify(newlyLogged))
                    setState(true)
                }

            }

        } else {
            console.log("member logs not present")

            const memberObject = { [memberId]: warObject }
            const convertedData = JSON.stringify(memberObject)
            localStorage.setItem("memberLogs", convertedData)
            setState(true)
        }
    }
    return (

        <span data-tooltip-id="more-info-tooltip" data-tooltip-content="Store war performance locally" data-tooltip-place="bottom" onClick={storeLocal}><i className="bi bi-box-arrow-down"></i> </span>

    )


}

export default LocalDataStoreMember
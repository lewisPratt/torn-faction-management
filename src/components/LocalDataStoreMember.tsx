import type { warObject , parsedLogsShape, localStoreProps} from "../interfaces"



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

                if (isWarStored(memberId, warId)) {

                    console.log("this war is already stored, dont store it again")
                } else {

                    console.log("war not stored yet, store it now.")
                    parsedLogs[memberId] = { ...parsedLogs[memberId], ...warObject }
                    localStorage.setItem("localLogs", JSON.stringify(parsedLogs))
                    setHasSaved(prev => !prev)

                }
                console.log("B: member logs", thisMembersLogs)

            }
            else {
                console.log("this member is not stored")
                const newlyLogged = { ...parsedLogs, [memberId]: warObject }

                localStorage.setItem("localLogs", JSON.stringify(newlyLogged))
                setHasSaved(prev => !prev)
            }

        }

        else {
            console.log("member logs not present")

            const memberObject = { [memberId]: warObject }
            const convertedData = JSON.stringify(memberObject)
            localStorage.setItem("localLogs", convertedData)
            setHasSaved(prev => !prev)
        }
    }


    function isWarStored(memberId: number, warId: number): boolean {
        const localLogs = localStorage.getItem("localLogs")
        if (!localLogs) return false

        const parsedLogs = JSON.parse(localLogs)
        if (!Object.keys(parsedLogs).includes(memberId.toString())) return false

        return Object.keys(parsedLogs[memberId]).includes(warId.toString())
    }


    function deleteLocal() {

        if (!isWarStored(memberId, warId)) return
        if (!localLogs) return

        const parsedLogs : parsedLogsShape = JSON.parse(localLogs)
        const memberLogs : warObject = parsedLogs[memberId]

        if(!Object.keys(memberLogs).includes(warId.toString())) return

        delete parsedLogs[memberId][warId]

        if(Object.values(parsedLogs[memberId]).length == 0) delete parsedLogs[memberId]

        const updatedLocalLogs = JSON.stringify(parsedLogs)
        localStorage.setItem("localLogs", updatedLocalLogs)
        //trigger rerender by changing the state to the opposite of its current value
        setHasSaved(prev => !prev)

    }



    return (
        <>
            {isWarStored(memberId, warId) ? <>
                <span className="stored-icon" data-tooltip-id="more-info-tooltip" data-tooltip-content="Already stored." data-tooltip-place="bottom" >
                    <i className="bi bi-check-square"></i>
                </span>
                <span className="stored-icon-trash" data-tooltip-id="more-info-tooltip" data-tooltip-content="Delete dataset from local storage." data-tooltip-place="bottom" onClick={deleteLocal}>
                    <i className="bi bi-trash"></i>
                </span>
            </>
                : <span className="store-locally-icon" data-tooltip-id="more-info-tooltip" data-tooltip-content="Store dataset locally" data-tooltip-place="bottom" onClick={storeLocal}><i className="bi bi-box-arrow-down"></i> </span>}

        </>
    )

}

export default LocalDataStoreMember
import { useEffect, useContext, useState } from "react"
import { ApiKeyContext } from "./ApiKeyContext"
import ChainList from "./ChainList"
import type { RankedWarsListData, SelectedWar, TornUserData, chainReportViewProps, chainListData } from "../interfaces"



function ChainReportView({ userData }: chainReportViewProps) {
    const apiKey = useContext(ApiKeyContext)

    console.log("userdata log:", userData)
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [chainList, setChainList] = useState<chainListData | null>(null)
    const [selectedWar, setSelectedWar] = useState<SelectedWar | null>(null)
    const [selectedOption, setSelectedOption] = useState<number>(0)
    const [rankedWarList, setRankedWarList] = useState<RankedWarsListData | null>(null)


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.torn.com/v2/faction/rankedwars?offset=0&limit=20&sort=DESC`, {
                headers: {
                    'Authorization': `ApiKey ${apiKey}`,
                    'accept': 'application/json'
                }
            })
            const data = await response.json()
            if (data.error) {
                console.log("error")
                setErrorMsg(data.error.error)
                console.log(data)
            }
            else {
                setRankedWarList(data.rankedwars)
                // setChainList(data.rankedwars)
            }
        }

        fetchData()
    }, [])

    //if there's no ranked wars returned or userdata is missing, early return
    if (!rankedWarList || !userData) return

    const faction_id = userData.faction_id

    function getChains(e: React.SubmitEvent) {
        e.preventDefault()

        if (!selectedWar) return

        const warStartTimestamp = selectedWar.start
        const warEndTimestamp = selectedWar.end

        const fetchData = async () => {
            const response = await fetch(`https://api.torn.com/v2/faction/chains?limit=50&sort=DESC&to=${warEndTimestamp}&from=${warStartTimestamp}`, {
                headers: {
                    'Authorization': `ApiKey ${apiKey}`,
                    'accept': 'application/json'
                }
            })
            const data = await response.json()
            if (data.error) {
                console.log("error")
                setErrorMsg(data.error.error)
                console.log(data)
            }
            else {
                console.log(data.chains)
                setChainList(data.chains)
            }
        }

        fetchData()


    }
    //function triggered when a war is selected from the select input
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (parseInt(e.target.value) === 0) {
            setErrorMsg("No war data found.")
            setSelectedWar(null)
            setSelectedOption(0)

            return
        } else {
            setErrorMsg("")
        }
        if (selectedWar) {
            setSelectedWar(null)
        }
        //update the state of the currently selected war
        setSelectedOption(parseInt(e.target.value))
        //if there is no rankedwar data show error (wont let you iterate over an object if its null state hasnt been handled.)
        if (!rankedWarList) {
            return <div id="faction-info-card"><p>Missing ranked war data</p></div>
        }
        //run through the previously cached ranked war data and find the details for the selected war
        const match = Object.entries(rankedWarList).find(([_mapKey, warData]) =>
            parseInt(e.target.value) === warData.end
        )
        if (match) setSelectedWar(match[1])

    }



    return (
        <>
            <div className="card">
                <form onSubmit={getChains}>
                    <label htmlFor="opponent-name">War Opponent:</label>
                    <select name="opponent-name" id="opponent-name" onChange={handleChange} value={selectedOption}>
                        <option value="0">Select a war</option>
                        {Object.entries(rankedWarList).map(([_mapKey, warData]) => {

                            return Object.entries(warData.factions).map(([_innerMapKey, factionDetails]) => {

                                if (factionDetails.id !== faction_id) {
                                    const disabled = warData.end === 0
                                    let ongoingWar = ""
                                    if (disabled) { ongoingWar = " - War ongoing" }
                                    return <option value={warData.end} key={warData.end} disabled={disabled}>{factionDetails.name} {ongoingWar}</option>

                                }
                                return null
                            })
                        })}
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>

            {chainList ?
                <ChainList list={chainList} />
                : null
            }
        </>
    )


}

export default ChainReportView

import { useState, useEffect } from 'react'
import type { RankedWarProps, RankedWarsListData, SelectedWar } from '../interfaces'



//not finished
function RankedWarSelector({ apiKey, faction_id }: RankedWarProps) {
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [rankedWarsList, setRankedWarsListData] = useState<RankedWarsListData | null>(null)
    const [selectedWar, setSelectedWar] = useState<SelectedWar | null>(null)
    const [warEndDate, setWarEndDate] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<number>(0)

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
                console.log(data.rankedwars)
                setRankedWarsListData(data.rankedwars)
            }
        }

        fetchData()
    }, [])
    // console.log("test", rankedWarsList)

    if (!rankedWarsList) {
        return <div id="faction-info-card"><p>Loading...</p></div>
    }

    return (
        <div id="faction-info-card">
            <select name="opponent-name" id="opponent-name" onChange={handleChange} value={selectedOption}>
                <option value="0">Select a war</option>
                {Object.entries(rankedWarsList).map(([warId, warData]) => {
                    const timestamp = warData.end
                    const convertedTimestamp = new Date(timestamp * 1000)
                    // console.log(convertedTimestamp)
                    return Object.entries(warData.factions).map(([factionId, factionDetails]) => {

                        if (factionDetails.id !== faction_id) {

                            return <option value={warData.end} key={warData.end}>{factionDetails.name}</option>
                        }
                        return null
                    })
                })}
            </select>
            <p>{warEndDate}</p>
        </div>
    )

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        //update the state of the currently selected war
        setSelectedOption(parseInt(e.target.value))
        //if there is no rankedwar data show error (wont let you iterate over an object if its null state hasnt been handled.)
        if (!rankedWarsList) {
            return <div id="faction-info-card"><p>Loading...</p></div>
        }
        //run through the previously cached ranked war data nd find the details for the selected war
        Object.entries(rankedWarsList).map(([warId, warData]) => {
            //if the selected war matches the currently iterated war data, start populating the details field.
            if(parseInt(e.target.value) == warData.end){
                console.log(warData.winner)
            }
        })

    }
}


export default RankedWarSelector
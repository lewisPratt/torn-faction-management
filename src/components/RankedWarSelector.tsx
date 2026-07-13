
import { useState, useEffect } from 'react'
import WarReport from './WarReport'
import type { RankedWarProps, RankedWarsListData, SelectedWar, warReportProps } from '../interfaces'



//not finished
function RankedWarSelector({ apiKey, faction_id }: RankedWarProps) {
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [rankedWarsList, setRankedWarsListData] = useState<RankedWarsListData | null>(null)
    const [selectedWar, setSelectedWar] = useState<SelectedWar | null>(null)
    const [warEndDate, setWarEndDate] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<number>(0)
    const [warReport, setWarReport] = useState<warReportProps | null>(null)

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

    if (!rankedWarsList) {
        return <div id="faction-info-card"><p>Loading...</p></div>
    }


    const noWarSelected = <p>No war selected </p>
    const timestamp = selectedWar ? selectedWar.end : 0
    const convertedTimestamp = new Date(timestamp * 1000)

    let warWinner = null
    let warLoser = null
    let opponent = null
    let myFaction = null
    // if a war has been selected from the dropdown
    if (selectedWar) {

        //set the team objects to remove need for repeated iteration
        if (Object.values(selectedWar.factions[0]).includes(faction_id)) {
            opponent = selectedWar.factions[1]
            myFaction = selectedWar.factions[0]
        } else {
            opponent = selectedWar.factions[0]
            myFaction = selectedWar.factions[1]
        }
        //set war winner name
        if (Object.values(opponent).includes(selectedWar.winner)) {
            warWinner = opponent
            warLoser = myFaction
        }
        else {
            warWinner = myFaction
            warLoser = opponent
        }

    }

    //function triggered when a war is selected from the select input
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if(selectedWar){
            setSelectedWar(null)
            setWarReport(null)
        }
        //update the state of the currently selected war
        setSelectedOption(parseInt(e.target.value))
        //if there is no rankedwar data show error (wont let you iterate over an object if its null state hasnt been handled.)
        if (!rankedWarsList) {
            return <div id="faction-info-card"><p>Loading...</p></div>
        }
        //run through the previously cached ranked war data and find the details for the selected war
        const match = Object.entries(rankedWarsList).find(([warId, warData]) =>
            parseInt(e.target.value) === warData.end
        )
        if (match) setSelectedWar(match[1])

    }
    function generateWarReport() {
        if(selectedWar){
        const report = {
            warStart: selectedWar.start,
            warEnd: selectedWar.end,
            target: selectedWar.target,
            factionId: faction_id,
            warId: selectedWar.id
        }
        setWarReport(report)
    }
    }
    return (
        <>
            <div className="card" >
                <h2>Ranked War Review</h2>
                <hr></hr>
                <select name="opponent-name" id="opponent-name" onChange={handleChange} value={selectedOption}>
                    <option value="0">Select a war</option>
                    {Object.entries(rankedWarsList).map(([warId, warData]) => {

                        return Object.entries(warData.factions).map(([factionId, factionDetails]) => {

                            if (factionDetails.id !== faction_id) {

                                return <option value={warData.end} key={warData.end}>{factionDetails.name}</option>
                            }
                            return null
                        })
                    })}
                </select>

                {!selectedWar ? noWarSelected :
                    <>
                        <h3>War end:  {convertedTimestamp.toLocaleString()}</h3>
                        <h4>Winner: {warWinner?.name}</h4>
                        <h5><span className="green-text">{warWinner?.score} points</span> / <span className="red-text">{warLoser?.score} points</span></h5>
                        <button onClick={generateWarReport}>Detailed war Report</button>
                    </>
                }
            </div>


            {!warReport ? null :

                <WarReport warStart={warReport.warStart} warEnd={warReport.warEnd} factionId={faction_id} target={warReport.target} warId={warReport.warId} />

            }
        </>
    )
}


export default RankedWarSelector
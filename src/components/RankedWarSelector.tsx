
import { useState, useEffect } from 'react'
import WarReport from './WarReport'
import type { RankedWarProps, RankedWarsListData, SelectedWar, warReportProps } from '../interfaces'



//not finished
function RankedWarSelector({ apiKey, faction_id }: RankedWarProps) {
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [rankedWarsList, setRankedWarsListData] = useState<RankedWarsListData | null>(null)
    const [selectedWar, setSelectedWar] = useState<SelectedWar | null>(null)
    const [selectedOption, setSelectedOption] = useState<number>(0)
    const [warReport, setWarReport] = useState<warReportProps | null>(null)
    const [warBreakdown, setWarBreadown] = useState<boolean>(false)
    const noReport = <div className="card"><p className="card-content">No report generated....yet</p></div>

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


    const noWarSelected = <p className="no-war-p">Select a war from the list above. </p>
    const endTimestamp = selectedWar ? selectedWar.end : 0
    const convertedEndTimestamp = new Date(endTimestamp * 1000)
    const startTimestamp = selectedWar ? selectedWar.start : 0
    const convertedStartTimestamp = new Date(startTimestamp * 1000)
    const warLengthDays = Math.floor((endTimestamp - startTimestamp) / 86400)
    const warLengthHours = Math.floor(((endTimestamp - startTimestamp) % 86400) / 3600)
    const warLengthMinutes = Math.floor((((endTimestamp - startTimestamp) % 86400) % 3600) / 60)
    console.log(warLengthDays)
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
    function clearReview() {
        setSelectedWar(null)
        setWarReport(null)
        setSelectedOption(0)
    }


    //function triggered when a war is selected from the select input
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (parseInt(e.target.value) === 0) {
            setErrorMsg("No war data found.")
            setSelectedWar(null)

            return
        } else {
            setErrorMsg("")
        }
        if (selectedWar) {
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
        const match = Object.entries(rankedWarsList).find(([_mapKey, warData]) =>
            parseInt(e.target.value) === warData.end
        )
        if (match) setSelectedWar(match[1])

    }
    function generateWarReport(e: React.SubmitEvent) {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        let armouryDate = 0

        if (selectedWar && formData) {

            //set the armourynews date dependant on when the user has picked to start it from. 
            const armouryNewsDate = formData.get("armoury-news-date")
            if (armouryNewsDate === "war-start") {

                armouryDate = selectedWar.start

            } else if (armouryNewsDate === "1-day") {

                armouryDate = (selectedWar.start - 86400)

            } else if (armouryNewsDate === "2-day") {

                armouryDate = (selectedWar.start - 172800)

            }

            const report = {
                warStart: selectedWar.start,
                warEnd: selectedWar.end,
                target: selectedWar.target,
                factionId: faction_id,
                warId: selectedWar.id,
                armouryTime: armouryDate
            }

            setWarReport(report)
            errorMsg ? setErrorMsg("") : null

        }
    }

    return (
        <>
            <div className="card" >
                <div id="war-selector-card" className="card-content" >
                    <h2>Ranked War Review</h2>
                    {errorMsg ? <p id="selector-error-message"> {errorMsg}</p> : null}
                    <hr></hr>
                    <form onSubmit={generateWarReport}>
                        <label htmlFor="oppnonet-name">War Opponent:</label>
                        <select name="opponent-name" id="opponent-name" onChange={handleChange} value={selectedOption}>
                            <option value="0">Select a war</option>
                            {Object.entries(rankedWarsList).map(([_mapKey, warData]) => {

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

                        {!selectedWar ? noWarSelected :
                            <>


                                <label htmlFor="armoury-news-selector">Armoury use date:</label>
                                <select id="armoury-news-selector" name="armoury-news-date" onChange={() => { setWarReport(null) }}>
                                    <option value="war-start">War start</option>
                                    <option value="1-day">1 day before war start</option>
                                    <option value="2-day">2 days before war start</option>
                                </select>
                                <button type="submit">Generate Review</button> 
                                <button type="button" className="secondary-button" onClick={() => setWarBreadown(prev => !prev)}>Show war Details?</button>
                                {warBreakdown ? (
                                    <>
                                        <p><i className="bi bi-trophy"></i> {warWinner?.name}</p>
                                        <p>Began:  {convertedStartTimestamp.toLocaleString()}</p>
                                        <p>Ended:  {convertedEndTimestamp.toLocaleString()}</p>
                                        <p>Length: {warLengthDays}D, {warLengthHours}H, {warLengthMinutes}M</p>
                                        <p><span className="green-text">{warWinner?.score} points</span> / <span className="red-text">{warLoser?.score} points</span></p>
                                    </>
                                ) : (
                                    null
                                )}
                                <p id="reset-report-button"><button type="button" className="secondary-button" onClick={clearReview}>Reset Review</button></p>

                            </>


                        }
                    </form></div>
            </div>


            {!warReport ? noReport :

                <WarReport warStart={warReport.warStart} warEnd={warReport.warEnd} factionId={faction_id} target={warReport.target} warId={warReport.warId} armouryTime={warReport.armouryTime} />

            }
        </>
    )
}


export default RankedWarSelector
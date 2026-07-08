import { useState, useEffect } from 'react'
interface factionProps {
    uData: any
    apiKey: string
}


function FactionInfoCard({ uData, apiKey }: factionProps) {

    const [errorMsg, setErrorMsg] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.torn.com/faction/?selections=basic&key=${apiKey}`)
            const data = await response.json()
            if (data.error) {
                console.log("error")
                setErrorMsg(data.error.error)
            }
            else {
                console.log(data)
            }
        }

        fetchData()
    }, [])



    if (!errorMsg) {
        return (
            <>
                <div id="faction-info-card">
                    <p>{uData.faction.faction_name}</p>
                    <p>Faction info obtained</p>
                </div>
                <div id="faction-info-card">
                    <p>{uData.faction.faction_name}</p>
                    <p>Faction info obtained</p>
                </div>
                <div id="faction-info-card">
                    <p>{uData.faction.faction_name}</p>
                    <p>Faction info obtained</p>
                </div>
            </>
        )
    }
    else {
        return (
            <div id="faction-info-card">
                <p>An error occurred</p>
            </div>
        )

    }



}

export default FactionInfoCard
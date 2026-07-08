import { useState, useEffect } from 'react'
import type { FactionData, FactionMember, factionProps } from '../interfaces'

function FactionInfoCard({ uData, apiKey }: factionProps) {

    const [errorMsg, setErrorMsg] = useState<string>('')
    const [facData, setFacData] = useState<FactionData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.torn.com/faction/?selections=basic&key=${apiKey}`)
            const data = await response.json()
            if (data.error) {
                console.log("error")
                setErrorMsg(data.error.error)
            }
            else {
                setFacData(data)
                console.log(data)
            }
        }

        fetchData()
    }, [])



    if (!errorMsg) {
        const memberCount = facData?.members ? Object.keys(facData.members).length : 0
        return (
            <>
                <div id="faction-info-card">
                    <h2>Faction Stats:</h2>
                    <h3>{facData?.name}</h3>
                    <p id="faction-description">Level {facData?.rank.level} {facData?.rank.name} faction with {facData?.rank.wins} wins.</p>
                    <p>There are {memberCount} players in your faction</p>
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
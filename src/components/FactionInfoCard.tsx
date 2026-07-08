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
                    <p>{facData?.name}</p>
                    <p>There are {memberCount} players in your faction</p>
                    <p>Rank: {facData?.rank.name}</p>
                    <p>Wins: {facData?.rank.wins}</p>
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
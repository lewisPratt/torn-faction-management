import { useState, useEffect } from 'react'
import type { FactionData, FactionMember, factionProps } from '../interfaces'

function FactionInfoCard({ uData, apiKey }: factionProps) {

    const [errorMsg, setErrorMsg] = useState<string>('')
    const [facData, setFacData] = useState<FactionData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.torn.com/v2/faction/basic`, {
                headers: {
                    'Authorization': `ApiKey ${apiKey}`,
                    'accept': 'application/json'
                }
            })
            const data = await response.json()
            if (data.error) {
                console.log("error")
                setErrorMsg(data.error.error)
            }
            else {
                setFacData(data.basic)
                // console.log(data.basic)
            }
        }

        fetchData()
    }, [])



    if (!errorMsg) {
        const memberCount = facData?.members
        return (
            <>
                <div className="card">
                    <h2>Faction Stats:</h2>
                    <hr></hr>
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
import { useState, useEffect } from 'react'
import type { FactionData, factionProps } from '../interfaces'

function FactionInfoCard({ apiKey }: factionProps) {

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
            }
        }

        fetchData()
    }, [])



    if (!errorMsg) {
        return (
            <>
                <div className="edge-to-edge my-faction-info">
                    <div className="card-content" >
                        <h3>{facData?.name}</h3>
                        <p id="faction-description"> Level {facData?.rank.level} {facData?.rank.name} faction with {facData?.rank.wins} wins.</p>
                      
                    </div>
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
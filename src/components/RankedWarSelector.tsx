
import { useState, useEffect } from 'react'

interface RankedWarProps {
    apiKey: string
    faction_id: number
}
interface RankedWarsListData {
    [key: string]: {
        end: number
        factions: {
            [key: string]: {
                id: number
                name: string
            }
        }
    }
}
interface RankedWarData {
    factions: {
        [key: string]: {
            chain: number
            name: string
        }
    }
    war: {
        start: number
        end: number
    }
}



//not finished
function RankedWarSelector({ apiKey, faction_id }: RankedWarProps) {
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [rankedWarsList, setRankedWarsListData] = useState<RankedWarsListData | null>(null)

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
            <form action="" method="get">
                <select name="opponent-name" id="opponent-name">
                    {Object.entries(rankedWarsList).map(([warId, warData]) => {
                        const timestamp = warData.end
                        const convertedTimestamp = new Date(timestamp * 1000)
                        console.log(convertedTimestamp)
                        return Object.entries(warData.factions).map(([factionId, factionDetails]) => {
                            if (factionDetails.id !== faction_id) {

                                return <option value={factionId} key={factionId}>{factionDetails.name}</option>
                            }
                            return null
                        })
                    })}
                </select>
            </form>
        </div>
    )
}


export default RankedWarSelector
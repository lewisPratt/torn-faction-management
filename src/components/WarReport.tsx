import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import type { warReportProps, ReportData } from "../interfaces"


function WarReport({ warStart, warEnd, target, factionId, warId }: warReportProps) {
    const apiKey = useContext(ApiKeyContext)

    const [errorMsg, setErrorMsg] = useState<string>('')
    const [reportData, setReportData] = useState<ReportData | null>(null)

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`https://api.torn.com/v2/faction/${warId}/rankedwarreport`, {
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
                const factions = Object.values(data.rankedwarreport.factions)
                factions.forEach((faction: any) => {
                    if (faction.id === factionId) {
                        setReportData(faction)
                    }
                });
            }
        }

        fetchData()
    }, [])

    //if there is no data to populate the report(api error etc)
    if (!reportData) {
        return <div className="card full-width"><p>Loading...</p></div>
    }
    else {
        let attackerCount = 0
        let memberCount = 0
        const members = Object.values(reportData.members)
        members.forEach(member => {
            memberCount += 1
            if (member.attacks > 0) {
                attackerCount += 1
            }
        });
        const attackerPercentage = Math.round((attackerCount / memberCount) * 100)
        return (
            <div className="card full-width">
                <h2>{reportData.attacks} attacks by {attackerCount} members </h2><span className="faction-participation">({attackerPercentage}% faction participation)</span>
                {Object.entries(reportData.members).map(([memberId, memberData]) => {

                    // cycle through each member of the faction and display their data
                    // work out their participation percentage and values for visual representation of participaton (basic progress bar)
                    //set deafault values
                    const participation = Math.round((memberData.attacks / reportData.attacks) * 100)
                    let barWidth = `${participation}%`
                    let barColour = "lightgreen"

                    //determine colours for memebrs who met different attack thresholds
                    if (participation < 10 && participation > 0) {
                        barColour = "orange"
                    } else if (participation === 0) {
                        barColour = "red"
                    }
                    //highlight memebrs who did not participate
                    if (participation === 0) {
                        barWidth = "100%"
                        barColour = "red"
                    }

                    return (
                        <div key={memberData.id} className="member-row">
                            <div className="participation-bar" style={{ width: `${barWidth}`, background: `${barColour}` }}></div>
                            <p><a href={`https://www.torn.com/profiles.php?XID=${memberData.id}`} target="_blank">{memberData.name}</a></p><p>{memberData.attacks} <span className="participation"> ({participation}%)</span></p>
                        </div>
                    )
                })}


            </div>

        )
    }

}

export default WarReport
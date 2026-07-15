import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import type { warReportProps, ReportData, armouryNewsData } from "../interfaces"
import ReportRow from './ReportRow'
import XanaxCost from './XanaxCost'


function WarReport({ warStart, warEnd, target, factionId, warId, armouryTime }: warReportProps) {
    const apiKey = useContext(ApiKeyContext)

    const [errorMsg, setErrorMsg] = useState<string>('')
    const [reportData, setReportData] = useState<ReportData | null>(null)
    const [armouryNews, setArmouryNews] = useState<armouryNewsData[] | null>(null)

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

        const fetchAllPages = async () => {
            const allResults: armouryNewsData[] = []
            let nextUrl: string | null = `https://api.torn.com/v2/faction/news?striptags=false&limit=100&sort=DESC&from=${armouryTime}&to=${warEnd}&cat=armoryAction`
            while (nextUrl) {
                const response = await fetch(nextUrl, {
                    headers: {
                        'Authorization': `ApiKey ${apiKey}`,
                        'accept': 'application/json'
                    }
                })
                const data = await response.json()
                allResults.push(...data.news)
                nextUrl = data._metadata?.links?.prev ?? null
            }
            setArmouryNews(allResults)
        }

        fetchAllPages()

    }, [])

    //if there is no data to populate the report(api error etc)
    if (!reportData) {
        return <div className="card full-width"><p>Loading...</p></div>
    }
    //count total amount of xanax used in the war
    const totalXanax = armouryNews?.filter(newsItem =>
        newsItem.text.includes(`Xanax`) &&
        newsItem.text.includes("used")
    ).length ?? 0

    let attackerCount = 0
    const members = Object.values(reportData.members)
    members.forEach(member => {
        if (member.attacks > 0) {
            attackerCount += 1
        }
    });
    const attackerPercentage = Math.round((attackerCount / members.length) * 100)
    return (
        <div className="card full-width">
            <div className="card-content">

                <h2>{reportData.attacks} attacks by {attackerCount} members </h2><span className="faction-participation">({attackerPercentage}% faction participation)</span>
                <XanaxCost totalNumber={totalXanax} />
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
                        <div key={memberId}>
                            <ReportRow armouryNews={armouryNews} memberId={memberData.id} memberName={memberData.name} memberAttacks={memberData.attacks} memberScore={memberData.score} participationNumber={participation} participationBarWidth={barWidth} participationBarColour={barColour} armouryTime={armouryTime} warEndDate={warEnd} />
                        </div>
                    )
                })}


            </div>
        </div>

    )
}


export default WarReport
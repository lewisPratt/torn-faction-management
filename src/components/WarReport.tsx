import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import type { warReportProps, ReportData, armouryNewsData, warMemberDataType } from "../interfaces"
import ReportRow from './ReportRow'
import XanaxCost from './XanaxCost'
import LegendReportRow from './LegendReportRow'
import WarChart from './WarChart'
import { Tooltip } from 'react-tooltip'
interface fullAttacksData {
    attacker: {
        id: number
    }
}
//for accumulating and storing individual member performance from different wars

function WarReport({ warStart, warEnd, factionId, warId, armouryTime }: warReportProps) {
    const apiKey = useContext(ApiKeyContext)

    const [errorMsg, setErrorMsg] = useState<string>('')
    const [reportData, setReportData] = useState<ReportData | null>(null)
    const [armouryNews, setArmouryNews] = useState<armouryNewsData[] | null>(null)
    const [attacksData, setAttacksData] = useState<fullAttacksData[] | null>(null)
    const [warMemberData, setWarMemberData] = useState<warMemberDataType[] | null>(null)

    const xanaxEnergyGain = 250
    const [legendVisible, setLegend] = useState<boolean>(false)

    useEffect(() => {
        //fetch basic war report data for selected war
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
        //fetch armoury news for time period selected and war selected
        //used to parse and identify member use of faction items
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
                if (data.error) {
                    setErrorMsg("API permissions not present for armoury details.")
                    nextUrl = null
                }
                else {
                    allResults.push(...data.news)
                    nextUrl = data._metadata?.links?.prev ?? null
                }
            }
            setArmouryNews(allResults)
        }

        fetchAllPages()

        //fetch all attack log data that occurred during the war timeframe
        //used to determine additional attacks on non-war targets
        const fetchAllAttackPages = async () => {
            const allResults: fullAttacksData[] = []
            let nextUrl: string | null = `https://api.torn.com/v2/faction/attacksfull?filters=outgoing&limit=1000&sort=DESC&to=${warEnd}&from=${warStart}`
            while (nextUrl) {
                const response = await fetch(nextUrl, {
                    headers: {
                        'Authorization': `ApiKey ${apiKey}`,
                        'accept': 'application/json'
                    }
                })
                const data = await response.json()
                if (data.error) {
                    setErrorMsg("API permissions not present for armoury details.")
                    nextUrl = null
                }
                else {
                    allResults.push(...data.attacks)
                    nextUrl = data._metadata?.links?.prev ?? null
                }
            }
            setAttacksData(allResults)
        }

        fetchAllAttackPages()

    }, [])
    useEffect(() => {

        if (!reportData || !armouryNews || !attacksData) return

        const members = Object.values(reportData.members)
        const newWarMemberDataArray: warMemberDataType[] = []

        members.forEach(memberData => {
            const participation = Math.round((memberData.attacks / reportData.attacks) * 100)

            let totalWartimeAttacks = 0
            attacksData.forEach(attackItem => {
                if (attackItem.attacker.id === memberData.id) {
                    totalWartimeAttacks += 1
                }
            })
            const extraAttacks = totalWartimeAttacks - memberData.attacks

            const preFiltered = armouryNews.filter(newsItem =>
                newsItem.text.includes(`XID=${memberData.id}`) &&
                newsItem.text.includes("used")
            )
            const xanaxFiltered = preFiltered.filter(newsItem => newsItem.text.includes("Xanax"))
            const xanaxGain = xanaxFiltered.length * xanaxEnergyGain
            const attackPotential = xanaxGain / 25
            const medsFiltered = preFiltered.filter(newsItem =>
                newsItem.text.includes("Morphine") || newsItem.text.includes("First Aid Kit")
            )
            const ipecacFiltered = preFiltered.filter(newsItem => newsItem.text.includes("Ipecac"))

            const memberPerformance = {
                [memberData.id]: {
                    xanaxUsed: xanaxFiltered.length,
                    medsUsed: medsFiltered.length,
                    ipecacUsed: ipecacFiltered.length,
                    attackPotential: attackPotential,
                    war_attacks: memberData.attacks,
                    outside_attacks: extraAttacks,
                    name: memberData.name,
                    score: memberData.score,
                    participation_perc: participation,
                    war_id: warId
                }
            }

            newWarMemberDataArray.push(memberPerformance)
        })

        setWarMemberData(newWarMemberDataArray)
    }, [reportData, armouryNews, attacksData])


    //toggle visibility of the legend component
    function toggleLegend() {
        setLegend(prev => !prev)
    }

    //if there is no data to populate the report(api error etc)
    if (!reportData) {
        return <div className="card"><p className="card-content">Loading...</p></div>
    }

    //count total amount of xanax used in the war
    const totalXanax = armouryNews?.filter(newsItem =>
        newsItem.text.includes(`Xanax`) &&
        newsItem.text.includes("used")
    ).length ?? 0

    //total up number of memebrs who attacked during the war
    let attackerCount = 0
    const members = Object.values(reportData.members)
    members.forEach(member => {
        if (member.attacks > 0) {
            attackerCount += 1
        }
    });
    //determine percentage of member participation 
    const attackerPercentage = Math.round((attackerCount / members.length) * 100)




    return (
        <>
            <div id="report-container">
                <div className="card" id="legend">
                    <button onClick={toggleLegend}>Legend</button>

                    {legendVisible ? <><p>Hover over the elements in the row below to see what they mean.</p><LegendReportRow /></> : null}
                </div>


                <div className="card">
                    <div className="card-content">
                        <h2>{reportData.attacks} attacks by {attackerCount} members </h2>
                        <p id="faction-report-perc"><span className="faction-participation">({attackerPercentage}% faction participation)</span>
                            <XanaxCost totalNumber={totalXanax} /></p>


                        {errorMsg ? <p id="report-error-message">{errorMsg}</p> : null}

                        {warMemberData ? <div id="chart-container"><WarChart warMemberData={warMemberData} /></div> : null}
                        <div id="report-rows-container">
                            <Tooltip anchorSelect=".user-profile">
                                Go to profile.
                            </Tooltip>
                            <Tooltip anchorSelect=".user-message">
                                Send message.
                            </Tooltip>
                            {warMemberData && warMemberData.map((memberEntry) => {
                                const memberId = Object.keys(memberEntry)[0]
                                const stats = Object.values(memberEntry)[0]

                                const participation = stats.participation_perc
                                let barWidth = `${participation}%`
                                let barColour = "lightgreen"

                                if (stats.war_attacks < 10 && stats.war_attacks > 0) {
                                    barColour = "orange"
                                } else if (stats.war_attacks === 0) {
                                    barColour = "lightcoral"
                                    barWidth = "100%"
                                }

                                return (
                                    <div key={memberId} className="row-container">
                                        <ReportRow
                                            filteredNews={{
                                                xanaxUsed: stats.xanaxUsed,
                                                medsUsed: stats.medsUsed,
                                                ipecacUsed: stats.ipecacUsed,
                                                attackPotential: stats.attackPotential
                                            }}
                                            memberId={parseInt(memberId)}
                                            memberName={stats.name}
                                            memberAttacks={stats.war_attacks}
                                            wartimeAttacks={stats.outside_attacks}
                                            memberScore={stats.score}
                                            participationNumber={participation}
                                            participationBarWidth={barWidth}
                                            participationBarColour={barColour}
                                            armouryTime={armouryTime}
                                            warEndDate={warEnd}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default WarReport
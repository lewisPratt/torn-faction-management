import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import type { warReportProps, ReportData, armouryNewsData } from "../interfaces"
import ReportRow from './ReportRow'
import XanaxCost from './XanaxCost'
import LegendReportRow from './LegendReportRow'

interface fullAttacksData {
    attacker: {
        id: number
    }
}
//for accumulating and storing individual member performance from different wars
interface warMemberDataType {
    [memberId: number]: {
        xanaxUsed: number
        medsUsed: number
        ipecacUsed: number
        attackPotential: number
        war_attacks: number
        outside_attacks: number
        name: string
        score: number
        participation_perc: number
        war_id: number
    }
}
function WarReport({ warStart, warEnd, factionId, warId, armouryTime }: warReportProps) {
    const apiKey = useContext(ApiKeyContext)

    const [errorMsg, setErrorMsg] = useState<string>('')
    const [reportData, setReportData] = useState<ReportData | null>(null)
    const [armouryNews, setArmouryNews] = useState<armouryNewsData[] | null>(null)
    const [attacksData, setAttacksData] = useState<fullAttacksData[] | null>(null)

    const xanaxEnergyGain = 250
    let warMemberData: warMemberDataType[] = []
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
                        <h2>{reportData.attacks} attacks by {attackerCount} members </h2><span className="faction-participation">({attackerPercentage}% faction participation)</span>
                        <XanaxCost totalNumber={totalXanax} />
                        {errorMsg ? <p id="report-error-message">{errorMsg}</p> : null}

                        {Object.entries(reportData.members).map(([_mapKey, memberData]) => {

                            // cycle through each member of the faction and display their data
                            // work out their participation percentage and values for visual representation of participaton (basic progress bar)
                            const participation = Math.round((memberData.attacks / reportData.attacks) * 100)
                            let barWidth = `${participation}%`
                            let barColour = "lightgreen"
                            let totalWartimeAttacks = 0

                            //determine colours for members who met different attack thresholds
                            if (memberData.attacks < 10 && memberData.attacks > 0) {
                                barColour = "orange"
                            } else if (memberData.attacks === 0) {
                                barColour = "lightcoral"
                                barWidth = "100%"
                            }
                            if (!attacksData) return

                            //count up total attacks held in attack logs (that cover the wartime timeperiod)
                            attacksData.filter(attackItem =>
                                attackItem.attacker.id === memberData.id ? totalWartimeAttacks += 1 : null
                            )
                            //work out how many additional attacks the memebr made on non-war targets
                            const extraAttacks = totalWartimeAttacks - memberData.attacks
                            
                            
                            if (!armouryNews) return
                            //filter through armoury news to find the news related to this member and pass it to the reportrow component
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

                            const fitleredMemberNews = {
                                xanaxUsed: xanaxFiltered.length,
                                medsUsed: medsFiltered.length,
                                ipecacUsed: ipecacFiltered.length,
                                attackPotential: attackPotential
                            }

                            //build object for each members performance in the war to pass on if war data is stored (TO BE ADDED)
                            const memberPerformance = {
                                [memberData.id]: {
                                    ...fitleredMemberNews,
                                    ["war_attacks"]: memberData.attacks,
                                    ["outside_attacks"]: extraAttacks,
                                    ["name"]: memberData.name,
                                    ["score"]: memberData.score,
                                    ["participation_perc"]: participation,
                                    ["war_id"]: warId
                                }
                            }
                            warMemberData.push(memberPerformance)

                            


                            return (
                                <div key={memberData.id}>
                                    <ReportRow filteredNews={fitleredMemberNews} memberId={memberData.id} memberName={memberData.name} memberAttacks={memberData.attacks} wartimeAttacks={extraAttacks} memberScore={memberData.score} participationNumber={participation} participationBarWidth={barWidth} participationBarColour={barColour} armouryTime={armouryTime} warEndDate={warEnd} />
                                </div>
                            )

                        })}
                        
                    </div>
                </div>
            </div>
        </>
    )
   
}


export default WarReport
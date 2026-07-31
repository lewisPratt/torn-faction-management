import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import type { warReportProps, ReportData, armouryNewsData, warMemberDataType, fullAttacksData } from "../interfaces"
import ReportRow from './ReportRow'
import XanaxCost from './XanaxCost'
import WarChart from './WarChart'
import { Tooltip } from 'react-tooltip'
import ClearLocalDataButton from './ClearLocalDataButton'


function WarReport({ warStart, warEnd, factionId, warId, armouryTime, opponentName, warReward, splitType, myFactionScore, deductXanax }: warReportProps) {
    const apiKey = useContext(ApiKeyContext)

    const [errorMsg, setErrorMsg] = useState<string>('')
    const [reportData, setReportData] = useState<ReportData | null>(null)
    const [armouryNews, setArmouryNews] = useState<armouryNewsData[] | null>(null)
    const [attacksData, setAttacksData] = useState<fullAttacksData[] | null>(null)
    const [warMemberData, setWarMemberData] = useState<warMemberDataType[] | null>(null)
    const [earliestnewsEntry, setEarliestNewsEntry] = useState<number>(0)
    const [_localDataChange, setLocalDataChange] = useState<boolean>(false)
    const [averagePrice, setAveragePrice] = useState<number>(0)

    const xanaxEnergyGain = 250
    let earliestEntryText
    let warRewardTotal: number
    let originalReward: number = 0
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
            let earliestEntry = 0
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
                    //set variable for the earliest entry retrieved from armoury news

                    if (data.news.length > 0 && Object.keys(data.news[0]).includes("timestamp")) {
                        //sets earliest to the last element of each pages news retrieved, so last page will overwrite and become the accurate last entry
                        earliestEntry = data.news.slice(-1)[0].timestamp
                    }
                    allResults.push(...data.news)
                    nextUrl = data._metadata?.links?.prev ?? null
                }
            }
            setEarliestNewsEntry(earliestEntry)
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


        //fetch Xanax cost details
        const fetchXanaxData = async () => {
            const response = await fetch(`https://api.torn.com/v2/market/206/itemmarket?limit=1&offset=0`, {
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
                setAveragePrice(data.itemmarket.item.average_price)

            }
        }

        fetchXanaxData()
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
            let extraAttacks = 0
            if (totalWartimeAttacks > memberData.attacks) {
                extraAttacks = totalWartimeAttacks - memberData.attacks
            }

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

    if (earliestnewsEntry) {
        const firstEntry = new Date(earliestnewsEntry * 1000)
        earliestEntryText = <p>Earliest Armoury entry retrieved: {firstEntry.toLocaleString()}</p>
    }
    originalReward = warReward
    if (averagePrice && splitType != "none" && deductXanax && warReward) {

        warReward -= (totalXanax * averagePrice)
    }
    warRewardTotal = warReward

    return (
        <>
            <div id="report-container">
                <div className="card">
                    <div className="card-content">
                        <h2>{reportData.attacks} attacks by {attackerCount} members </h2>
                        <div id="faction-report-overview">
                            <p>Ranked war against {opponentName}.</p>
                            <p><span className="faction-participation">({attackerPercentage}% faction participation)</span></p>
                            <XanaxCost totalNumber={totalXanax} averagePrice={averagePrice} />
                            {earliestEntryText ? earliestEntryText : <p>Could not determine earliest Armoury entry. (might not be any entries!)</p>}
                        </div>


                        {errorMsg ? <p id="report-error-message">{errorMsg}</p> : null}

                        {warMemberData ? <div id="chart-container"><WarChart warMemberData={warMemberData} /></div> : null}
                        <div id="report-rows-container">
                            {warRewardTotal != originalReward ? <><h3>Total reward amount: ${warRewardTotal.toLocaleString()} </h3><p id="xanax-deduction-p"> Before Xanax deduction: ${originalReward.toLocaleString()}</p> </>: null}
                            <p id="report-row-help">Select a row to see more info about that faction member</p>
                           <Tooltip id="more-info-tooltip" />

                            {warMemberData && warMemberData.map((memberEntry) => {
                                const memberId = Object.keys(memberEntry)[0]
                                const stats = Object.values(memberEntry)[0]

                                const participation = stats.participation_perc
                                let barWidth = `${participation}%`
                                let barClass = "participation-bar-positive"

                                if (stats.war_attacks < 10 && stats.war_attacks > 0) {
                                    barClass = "participation-bar-amber"
                                } else if (stats.war_attacks === 0) {
                                    barClass = "participation-bar-warning"
                                    barWidth = "100%"
                                }
                                //determine war payout (if applicable)
                                let memberPayout: number = 0
                                let payoutFormatted: string = ""
                                if (warReward != 0 && splitType != "none") {

                                    //determine amount based on what percentage of faction attacks the player made
                                    if (splitType === "attacks") {
                                        memberPayout = (participation / 100) * warReward
                                        //determine amount based on what percentage of faction respect score the player earned
                                    } else if (splitType === "score") {
                                        memberPayout = Math.round((stats.score / myFactionScore) * warReward)

                                    }
                                    payoutFormatted = new Intl.NumberFormat("en-GB").format(memberPayout)


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
                                            opponentName={opponentName}
                                            memberId={parseInt(memberId)}
                                            warId={warId}
                                            memberName={stats.name}
                                            memberAttacks={stats.war_attacks}
                                            wartimeAttacks={stats.outside_attacks}
                                            memberScore={stats.score}
                                            participationNumber={participation}
                                            participationBarWidth={barWidth}
                                            participationBarClass={barClass}
                                            armouryTime={armouryTime}
                                            warEndDate={warEnd}
                                            setLocalDataChange={setLocalDataChange}
                                            memberPayout={payoutFormatted}
                                        />
                                    </div>
                                )
                            })}
                            <ClearLocalDataButton setLocalDataChange={setLocalDataChange} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default WarReport
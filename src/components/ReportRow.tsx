import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import { useState, useEffect } from 'react'
import type { MemberRow } from '../interfaces'
interface membersArmouryNews {
    xanaxUsed: number
    medsUsed: number
    ipecacUsed: number
    attackPotential: number
}

function ReportRow({ memberId, memberName, memberAttacks, participationNumber, participationBarWidth, participationBarColour, memberScore, armouryTime, warEndDate, armouryNews }: MemberRow) {
    const [showMoreInfo, setShowMore] = useState<boolean>(false)
    const [filteredNews, setFilteredMemberNews] = useState<membersArmouryNews | null>(null)
    const xanaxEnergyGain = 250
    const energyCostPerAttack = 25
    let xanaxFiltered = []
    let medsFiltered = []
    let ipecacFiltered = []
    let attackPotential = 0
    const averageRespect = memberAttacks > 0 ?
        (memberScore / memberAttacks).toFixed(2)
        : "0"

    function showMore() {
        setShowMore(prev => !prev)
    }

    useEffect(() => {
        if (!armouryNews) return

        const preFiltered = armouryNews.filter(newsItem =>
            newsItem.text.includes(`XID=${memberId}`) &&
            newsItem.text.includes("used")
        )

        const xanaxFiltered = preFiltered.filter(newsItem => newsItem.text.includes("Xanax"))
        const xanaxGain = xanaxFiltered.length * xanaxEnergyGain
        const attackPotential = ((150 + xanaxGain) / 25)
        const medsFiltered = preFiltered.filter(newsItem =>
            newsItem.text.includes("Morphine") || newsItem.text.includes("First Aid Kit")
        )
        const ipecacFiltered = preFiltered.filter(newsItem => newsItem.text.includes("Ipecac"))

        setFilteredMemberNews({
            xanaxUsed: xanaxFiltered.length,
            medsUsed: medsFiltered.length,
            ipecacUsed: ipecacFiltered.length,
            attackPotential: attackPotential
        })

    }, [armouryNews])

    return (
        <div className="row-container">
            <div className="member-row" onClick={showMore}>
                <div className="participation-bar" style={{ width: `${participationBarWidth}`, background: `${participationBarColour}` }}></div>
                <p>{memberName} </p><p className="respect-p">Respect earned: {memberScore}</p><p><i className="bi bi-bullseye"></i> {memberAttacks} <span className="participation"> ({participationNumber}%)</span></p>
                {filteredNews ?
                    <p>{filteredNews.xanaxUsed} | {filteredNews.attackPotential} - {filteredNews.medsUsed} - {filteredNews.ipecacUsed}</p>
                    : null
                }

            </div>
            {showMoreInfo ?
                <div className="more-info-container">
                    <h3>More Info</h3>
                    <p><a href={`https://www.torn.com/messages.php#/p=compose&XID=${memberId}`} target="_blank"><i className="bi bi-envelope-arrow-up"></i></a> <a href={`https://www.torn.com/profiles.php?XID=${memberId}`} target="_blank"><i className="bi bi-person-circle"></i></a></p>
                    <p className="average-p">{memberName} averaged {averageRespect} respect per attack.</p>
                </div>
                : null
            }
        </div>
    )

}

export default ReportRow
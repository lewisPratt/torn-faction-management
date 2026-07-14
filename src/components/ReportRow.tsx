import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import { useState, useEffect } from 'react'

interface MemberRow {
    memberId: number
    memberName: string
    memberAttacks: number
    memberScore: number
    participationNumber: number
    participationBarWidth: string
    participationBarColour: string

}

function ReportRow({ memberId, memberName, memberAttacks, participationNumber, participationBarWidth, participationBarColour, memberScore}: MemberRow) {
    const [showMoreInfo, setShowMore] = useState<boolean>(false)
    const averageRespect =  (memberScore /memberAttacks).toFixed(2)


    function showMore() {
        let toggleState: boolean
        showMoreInfo ? toggleState = false : toggleState = true
        setShowMore(toggleState)
    }

    return (
        <>
            <div key={memberId} className="member-row" onClick={showMore}>
                <div className="participation-bar" style={{ width: `${participationBarWidth}`, background: `${participationBarColour}` }}></div>
                <p><a href={`https://www.torn.com/profiles.php?XID=${memberId}`} target="_blank">{memberName}</a></p><p className="respect-p">Respect earned: {memberScore}</p><p><i className="bi bi-bullseye"></i> {memberAttacks} <span className="participation"> ({participationNumber}%)</span></p>


            </div>
            {showMoreInfo ?
                <div className="more-info-container">
                    <h3>More Info</h3>
                    <p className="average-p">{memberName} averaged {averageRespect} respect per attack.</p>
                </div>
                : null
            }
        </>
    )

}

export default ReportRow
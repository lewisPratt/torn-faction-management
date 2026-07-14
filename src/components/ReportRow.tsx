import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import { useState, useEffect } from 'react'

interface MemberRow {
    memberId: number
    memberName: string
    memberAttacks: number
    participationNumber: number
    participationBarWidth: string
    participationBarColour: string

}

function ReportRow({ memberId, memberName, memberAttacks, participationNumber, participationBarWidth, participationBarColour }: MemberRow) {
    const [showMoreInfo, setShowMore] = useState<boolean>(false)


    function showMore() {
        let toggleState : boolean
        showMoreInfo ? toggleState = false : toggleState = true
        setShowMore(toggleState)
    }

    return (
        <div key={memberId} className="member-row" onClick={showMore}>
            <div className="participation-bar" style={{ width: `${participationBarWidth}`, background: `${participationBarColour}` }}></div>
            <p><a href={`https://www.torn.com/profiles.php?XID=${memberId}`} target="_blank">{memberName}</a></p><p>{memberAttacks} <span className="participation"> ({participationNumber}%)</span></p>

            {showMoreInfo ?
                <div className="more-info"><p>this will be more info</p></div>
                : null
            }
        </div>
    )

}

export default ReportRow
import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import { useState, useEffect } from 'react'
import MemberArmouryNews from './MemberArmouryNews'
import type { MemberRow } from '../interfaces'


function ReportRow({ memberId, memberName, memberAttacks, participationNumber, participationBarWidth, participationBarColour, memberScore, armouryTime, warEndDate  }: MemberRow) {
    const [showMoreInfo, setShowMore] = useState<boolean>(false)
    const averageRespect = memberAttacks > 0 ?
        (memberScore / memberAttacks).toFixed(2)
        : "0"


    function showMore() {
        setShowMore(prev => !prev)
    }

    return (
        <div className="row-container">
            <div  className="member-row" onClick={showMore}>
                <div className="participation-bar" style={{ width: `${participationBarWidth}`, background: `${participationBarColour}` }}></div>
                <p>{memberName} </p><p className="respect-p">Respect earned: {memberScore}</p><p><i className="bi bi-bullseye"></i> {memberAttacks} <span className="participation"> ({participationNumber}%)</span></p>


            </div>
            {showMoreInfo ?
                <div className="more-info-container">
                    <h3>More Info</h3>
                    <p><a href={`https://www.torn.com/messages.php#/p=compose&XID=${memberId}`} target="_blank"><i className="bi bi-envelope-arrow-up"></i></a> <a href={`https://www.torn.com/profiles.php?XID=${memberId}`} target="_blank"><i className="bi bi-person-circle"></i></a></p>
                    <p className="average-p">{memberName} averaged {averageRespect} respect per attack.</p>
                    <MemberArmouryNews memberId={memberId} memberName={memberName} armouryFromDate={armouryTime} warEndDate={warEndDate}/>
                </div>
                : null
            }
        </div>
    )

}

export default ReportRow
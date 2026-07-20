import { useState } from 'react'
import type { MemberRow } from '../interfaces'
import ThisMemberDetails from './ThisMemberDetails'



function ReportRow({ memberId, memberName, memberAttacks, participationNumber, participationBarWidth, participationBarColour, memberScore, filteredNews, wartimeAttacks}: MemberRow) {
    const [showMoreInfo, setShowMore] = useState<boolean>(false)
    const averageRespect = memberAttacks > 0 ?
        (memberScore / memberAttacks).toFixed(2)
        : "0"
    const warningIcon = filteredNews && filteredNews.attackPotential > memberAttacks ? <i className="warning-icon bi bi-exclamation-triangle-fill"></i>
        : null


    function showMore() {
        setShowMore(prev => !prev)
    }


    return (
        <div className="row-container">
            <div className="member-row" onClick={showMore}>
                <div className="participation-bar" style={{ width: `${participationBarWidth}`, background: `${participationBarColour}` }}></div>
                <p className="player-name-p">{memberName} {warningIcon} <br /><span className="respect-span">R: {memberScore}</span> </p>
                <p ><i className="bi bi-bullseye"></i> {memberAttacks}<span className="participation"> ({participationNumber}%)</span></p>
                {filteredNews ?

                    <p className="quick-stats-p"><i className="bi bi-plus-circle-dotted"></i>{wartimeAttacks} | <i className="bi bi-capsule"></i>{filteredNews.xanaxUsed} | <i className="bi bi-crosshair"></i>{filteredNews.attackPotential} | <i className="bi bi-heart-pulse"></i>{filteredNews.medsUsed} | <i className="bi bi-droplet"></i>{filteredNews.ipecacUsed}</p>
                    : null
                }

            </div>
            {showMoreInfo ?
                <div className="more-info-container">
                    <h3>More Info</h3>
                    <p className="player-action-p"><a href={`https://www.torn.com/messages.php#/p=compose&XID=${memberId}`} target="_blank"><i className="bi bi-envelope-arrow-up"></i></a> <a href={`https://www.torn.com/profiles.php?XID=${memberId}`} target="_blank"><i className="bi bi-person-circle"></i></a></p>
                    <p className="average-p">{memberName} averaged {averageRespect} respect per attack.</p>
                    <div className="stats-container">
                        <div>
                            <h4>Xanax used:</h4>
                            <p>{filteredNews?.xanaxUsed}</p>
                        </div>
                        <div>
                            <h4>Expected Attacks:</h4>
                            <p>{filteredNews?.attackPotential}</p>
                        </div>
                        <div>
                            <h4>Meds Used:</h4>
                            <p>{filteredNews?.medsUsed}</p>
                        </div>
                        <div>
                            <h4>Ipecac Used:</h4>
                            <p>{filteredNews?.ipecacUsed}</p>
                        </div>
                    </div>
                    <ThisMemberDetails memberId={memberId} />
                </div>
                : null
            }


        </div>
    )

}

export default ReportRow
import { useState } from 'react'
import type { MemberRow } from '../interfaces'
import ThisMemberDetails from './ThisMemberDetails'


function ReportRow({ memberId, warId, memberName, memberAttacks, participationNumber, participationBarWidth, participationBarClass, memberScore, filteredNews, wartimeAttacks }: MemberRow) {
    const [showMoreInfo, setShowMore] = useState<boolean>(false)
    const averageRespect = memberAttacks > 0 ?
        (memberScore / memberAttacks).toFixed(2)
        : "0"
    const warningIcon = filteredNews && filteredNews.attackPotential > memberAttacks ? <span className="warning-icon bi bi-exclamation-triangle-fill"></span>
        : null
    const cutoff = memberName.length > 6 ? ".." : ""
    const messageText = `Message ${memberName}.`
    const profileText = `View ${memberName}'s profile.`
    const participationBarClasses = `participation-bar ${participationBarClass}`

    let rowName = ""

    if (screen.width < 768) {
        rowName = `${memberName.slice(0, 6)}${cutoff}`
    } else {
        rowName = memberName
    }

    function showMore() {
        setShowMore(prev => !prev)
    }
    function storeLocal() {

        const memberData = {
            xanaxTaken: filteredNews?.xanaxUsed,
            memberAttacks: memberAttacks,
            participationPerc: participationNumber,
            wartimeAttacksTotal: wartimeAttacks,
            attackPotential: filteredNews?.attackPotential,
            medsUsed: filteredNews?.medsUsed,
            ipecacUsed: filteredNews?.ipecacUsed,
        }

        const warObject = { [warId]: memberData }



        // console.log(warObject)
        //if overall memberslog item is present in local storage
        if (localStorage.getItem("memberLogs")) {
            //grab the memberslog item 
            const loggedMembers = localStorage.getItem("memberLogs")
            if (loggedMembers) {
                //parse the string value back into JS object
                const parsedLogs = JSON.parse(loggedMembers)
                console.log(parsedLogs)
                if(Object.keys(parsedLogs).includes(memberId.toString())){
                    console.log("this member is stored")
                    
                }
                else {
                    console.log("this member is not stored")
                }
                
            }

        } else {
            console.log("member logs not present")
            
            const memberObject = {[memberId] : warObject}
            const convertedData = JSON.stringify(memberObject)
            localStorage.setItem("memberLogs", convertedData)
        }
    }
    return (
        <>
            <div className="row-content" onClick={showMore}>
                <div className={participationBarClasses} style={{ width: `${participationBarWidth}` }}></div>
                <p className="player-name-p">{rowName}  <br /><span className="respect-span">R: {memberScore}</span> </p>
                <p ><i className="bi bi-bullseye"></i> {memberAttacks}<span className="participation"> ({participationNumber}%)</span> {warningIcon}</p>
                {filteredNews ?

                    <p className="quick-stats-p"><i className="bi bi-plus-circle-dotted"></i>{wartimeAttacks} | <i className="bi bi-capsule"></i>{filteredNews.xanaxUsed} | <i className="bi bi-crosshair"></i>{filteredNews.attackPotential} | <i className="bi bi-heart-pulse"></i>{filteredNews.medsUsed} | <i className="bi bi-droplet"></i>{filteredNews.ipecacUsed}</p>
                    : null
                }

            </div>
            {showMoreInfo ?
                <div className="more-info-container">
                    <h3>{memberName}</h3>
                    <p className="player-action-p">
                        <a data-tooltip-id="more-info-tooltip" data-tooltip-content={messageText} data-tooltip-place="bottom" href={`https://www.torn.com/messages.php#/p=compose&XID=${memberId}`} target="_blank"><i className="bi bi-envelope-arrow-up"> </i></a>
                        <a data-tooltip-id="more-info-tooltip" data-tooltip-content={profileText} data-tooltip-place="bottom" href={`https://www.torn.com/profiles.php?XID=${memberId}`} target="_blank"><i className="bi bi-person-circle"></i> </a>
                        <span data-tooltip-id="more-info-tooltip" data-tooltip-content="Store performance Locally" data-tooltip-place="bottom" onClick={storeLocal}><i className="bi bi-box-arrow-down"></i> </span>
                    </p>

                    <p className="average-p">{memberName} averaged {averageRespect} respect per attack.</p>
                    {warningIcon ? <p className="warning-p">Based on their faction Xanax use, {memberName} did not perform the number of attacks expected.</p> : null}
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
        </>
    )
}

export default ReportRow
import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import { useState, useEffect } from 'react'

interface thisMemberDetailsProps {
    memberId: number
}
interface memberDetailsData {
    lastActive: string
    donatorStatus: string
    level: number
}

function ThisMemberDetails({ memberId }: thisMemberDetailsProps) {
    const apiKey = useContext(ApiKeyContext)
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [memberDetails, setMemberDetails] = useState<memberDetailsData | null>(null)

    const fetchData = async () => {
        const response = await fetch(`https://api.torn.com/v2/user/${memberId}/profile?striptags=true`, {
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
            console.log(data)
            const details = {
                lastActive: data.profile.last_action.timestamp,
                donatorStatus: data.profile.donator_status,
                level: data.profile.level
            }
            setMemberDetails(details)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (!memberDetails) return

    const lastActiveReadable = new Date(memberDetails.lastActive)

    return (
        <div className="member-details-container">
            <p>Last Active {memberDetails.lastActive} | {!memberDetails.donatorStatus ? "Player" : memberDetails.donatorStatus} | Level {memberDetails.level}</p>
        </div>
    )
}

export default ThisMemberDetails
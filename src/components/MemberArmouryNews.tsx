import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import { useState, useEffect } from 'react'

interface MembersArmouryProps {
    memberId: number
    memberName: string
    armouryFromDate: number
}

interface armouryNewsData {

}
interface membersArmouryNews {

}
// impliment option to see members armoury use during war period ASWELL AS from a specific timestamp before the war. 
//during war period would just need timestamps included in the ranked war report. helps show meds usage durign war
//user defined timescale that starts before the war, maybe war.start - 2 days (or similar) helps to see stacking action before war begins
//so far only implimented basic call to grab armoury news. 
//need to account for over 100 records returned
function MemberArmouryNews({ memberId, armouryFromDate, memberName }: MembersArmouryProps) {
    const apiKey = useContext(ApiKeyContext)
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [armouryNews, setArmouryNews] = useState<armouryNewsData | null>(null)

    function handleArmouryNews() {
        const fetchData = async () => {
            const response = await fetch(`https://api.torn.com/v2/faction/news?striptags=false&limit=100&sort=DESC&from=${armouryFromDate}&cat=armoryAction`, {
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
                setArmouryNews(data)
            }
        }

        fetchData()





    }






    return (
        <div className="member-armoury-news-container">
            <p>Obtain specific armoury news related to {memberName}.</p>
            <select>
                <option>Xanax</option>
                <option>Meds</option>
            </select>
            <button onClick={handleArmouryNews}>Grab data</button>
        </div>
    )

}

export default MemberArmouryNews
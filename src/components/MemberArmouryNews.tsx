import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import { useState, useEffect } from 'react'

interface MembersArmouryProps {
    memberId: number
    memberName: string
    armouryFromDate: number
    warEndDate: number
}

interface armouryNewsData {
    [key:string]: {
        id: number
        text: string
        timestamp: number
    }
}
interface membersArmouryNews {

}
// impliment option to see members armoury use during war period ASWELL AS from a specific timestamp before the war. - done
//during war period would just need timestamps included in the ranked war report. helps show meds usage durign war -done
//user defined timescale that starts before the war, maybe war.start - 2 days (or similar) helps to see stacking action before war begins - done
//so far only implimented basic call to grab armoury news. 
//need to account for over 100 records returned
function MemberArmouryNews({ memberId, armouryFromDate, memberName, warEndDate }: MembersArmouryProps) {
    const apiKey = useContext(ApiKeyContext)
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [armouryNews, setArmouryNews] = useState<armouryNewsData[] | null>(null)


        //api call to collect all the data from armoury within a given time period. Cycles through the pages if there are over 100 items returned. 
    const fetchAllPages = async () => {
        const allResults: armouryNewsData[] = []
        let nextUrl: string | null = `https://api.torn.com/v2/faction/news?striptags=false&limit=100&sort=DESC&from=${armouryFromDate}&cat=armoryAction`

        while (nextUrl) {
            const response = await fetch(nextUrl, {
                headers: {
                    'Authorization': `ApiKey ${apiKey}`,
                    'accept': 'application/json'
                }
            })
            const data = await response.json()

            allResults.push(data.news)

            nextUrl = data._metadata?.links?.prev ?? null
            //console.log(data.news)
        }
        console.log(allResults)
        setArmouryNews(allResults)
    }

    function handleArmouryNews() {
        fetchAllPages()
        
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
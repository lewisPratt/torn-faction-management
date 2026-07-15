import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import { useState, useEffect } from 'react'
import type { MembersArmouryProps, armouryNewsData } from '../interfaces'

interface membersArmouryNews {
    matchingEntries: number
    attackPotential: number
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
    const [filterredMemberNews, setFilteredMemberNews] = useState<membersArmouryNews | null>(null)
    const [newsType, setNewsType] = useState<string>("")
    const xanaxEnergyGain = 250
    const energyCostPerAttack = 25
  
    //api call to collect all the data from armoury within a given time period. Cycles through the pages if there are over 100 items returned. 
    const fetchAllPages = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        if (formData) {
            const newsType = formData.get("news-type")
            if (newsType) setNewsType(newsType.toString())
            const allResults: armouryNewsData[] = []


            let nextUrl: string | null = `https://api.torn.com/v2/faction/news?striptags=false&limit=100&sort=DESC&from=${armouryFromDate}&to=${warEndDate}&cat=armoryAction`

            while (nextUrl) {
                const response = await fetch(nextUrl, {
                    headers: {
                        'Authorization': `ApiKey ${apiKey}`,
                        'accept': 'application/json'
                    }
                })
                const data = await response.json()

                allResults.push(...data.news)

                nextUrl = data._metadata?.links?.prev ?? null
            }
            // console.log(allResults)
            setArmouryNews(allResults)
        }
    }

    useEffect(() => {
        if (!armouryNews || !newsType) return
        let filtered = []
        let attackPotential = 0
        const preFiltered = armouryNews.filter(newsItem => newsItem.text.includes(`XID=${memberId}`) && newsItem.text.includes("used"))
        if (newsType === "Xanax") {
            filtered = preFiltered.filter(newsItem => newsItem.text.includes("Xanax"))
            const xanaxGain = filtered.length * xanaxEnergyGain
            attackPotential = ((150 + xanaxGain) / 25) 
        } else if (newsType === "Meds") {
            filtered = preFiltered.filter(newsItem => (newsItem.text.includes("Morphine") || (newsItem.text.includes("First Aid Kit")))
            )
        } else if (newsType === "Ipecac") {
            filtered = preFiltered.filter(newsItem => newsItem.text.includes("Ipecac"))
        }
        const memberNews = {
            matchingEntries: filtered.length,
            attackPotential: attackPotential
        }
        setFilteredMemberNews(memberNews)

    }, [armouryNews, newsType])

    return (
        <>
            <div className="member-armoury-news-container">
                <p>Obtain specific armoury news related to {memberName}.</p>
                <form onSubmit={fetchAllPages}>
                    <select name="news-type">
                        <option value="Xanax">Xanax</option>
                        <option value="Meds">Meds</option>
                        <option value="Ipecac">Ipecac Syrup</option>
                    </select>
                    <button >Grab data</button>
                </form>
            </div>

            {filterredMemberNews ?
                <div>{filterredMemberNews.matchingEntries} | {filterredMemberNews.attackPotential}</div>


                : null
            }
        </>
    )

}

export default MemberArmouryNews
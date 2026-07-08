import { useState, useEffect } from 'react'
import type { FactionData, FactionMember, factionProps } from '../interfaces'

//not finished
function FactionReportCard({ apiKey }: { apiKey: string }) {
    const [errorMsg, setErrorMsg] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.torn.com/faction/?selections=basic&key=${apiKey}`)
            const data = await response.json()
            if (data.error) {
                console.log("error")
                setErrorMsg(data.error.error)
            }
            else {
                console.log(data)
            }
        }

        fetchData()
    }, [])
}
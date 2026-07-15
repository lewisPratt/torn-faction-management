import { useContext } from 'react'
import { ApiKeyContext } from './ApiKeyContext'
import { useState, useEffect } from 'react'

interface xanaxCostProps {
    totalNumber: number
}


function XanaxCost({ totalNumber }: xanaxCostProps) {
    const apiKey = useContext(ApiKeyContext)
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [averagePrice,setAveragePrice] = useState<number>(0)

    const fetchData = async () => {
        const response = await fetch(`https://api.torn.com/v2/market/206/itemmarket?limit=1&offset=0`, {
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
            console.log(data.itemmarket.item.average_price)
            setAveragePrice(data.itemmarket.item.average_price)
        }
    }

    fetchData()

    if(!averagePrice) return

    return (
        <p>{totalNumber} Xanax used at a cost of ${(totalNumber * averagePrice).toLocaleString()}</p>
    )
}

export default XanaxCost
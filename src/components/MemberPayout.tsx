import { useState } from "react"

interface memberPayoutProps {
    payout: string
}
function MemberPayout({ payout }: memberPayoutProps) {
    const backgroundString: string = "lightgreen"
    const textDecString: string = "line-through"
    const [backgroundCol, setBackgroundCol] = useState<string>()
    const [textDec, setTextDec] = useState<string>()


    function CheckOff() {
        console.log(backgroundCol)
        if (!backgroundCol) {
            setBackgroundCol(backgroundString)
            setTextDec(textDecString)
        } else if (backgroundCol === backgroundString) {
            setBackgroundCol("")
            setTextDec("")
        }
    }

    if (payout != "0") {
        return <div className="payout-container" style={{ background: backgroundCol, textDecoration: textDec}} onClick={CheckOff}>Share: ${payout}</div>
    } else {
        return null
    }

}

export default MemberPayout
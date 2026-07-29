

interface memberPayoutProps{
    payout: string
}
function MemberPayout({payout} : memberPayoutProps){

    if(payout != "0"){
        return <div className="payout-container">Share: ${payout}</div>
    }else{
        return
    }

}

export default MemberPayout
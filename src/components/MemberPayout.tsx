

interface memberPayoutProps{
    payout: string
}
function MemberPayout({payout} : memberPayoutProps){

    if(payout != "0"){
        return <div className="payout-container">${payout}</div>
    }else{
        return
    }

}

export default MemberPayout
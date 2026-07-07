

function FactionInfoCard({uData} : {uData : any}){

    return(
        <div id="faction-info-card">
            <p>{uData.faction.faction_name}</p>
        </div>
    )
}

export default FactionInfoCard
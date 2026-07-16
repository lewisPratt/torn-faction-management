
function LegendReportRow() {

console.log("hey")
    return (
        <div className="row-container">
            <div className="member-row" >
                <div className="participation-bar" style={{ width: "30%", background: "lightgreen" }}></div>
                <p className="player-name-p">Deck<i className="warning-icon bi bi-exclamation-triangle-fill"></i> <br /><span className="respect-span">Respect: 200</span> </p><p><i className="bi bi-bullseye"></i> 20 <span className="participation"> (30%)</span></p>
                <p className="quick-stats-p">3 | 30 - 10 - 3</p>
            </div>
        </div>
    )

}
export default LegendReportRow
import { Tooltip } from 'react-tooltip'


function LegendReportRow() {

    console.log("hey")
    return (
        <div className="row-container">
            <div className="member-row" style={{ cursor: "help" }}>
                <div className="participation-bar" style={{ width: "30%", background: "lightgreen" }}></div>
                <p className="player-name-p">Deck <a className="xanax-warning-tooltip"><i className="legend-outline warning-icon bi bi-exclamation-triangle-fill"></i> </a>
                    <br /><span className="legend-outline respect-span legend-respect">R: 200</span> </p>
                <p><a className="attacks-tooltip legend-outline"><i className="bi bi-bullseye"></i> 20</a> <span className="legend-outline participation legend-participation"> (30%)</span></p>

                <p className="quick-stats-p">
                    <a className="outside-attacks-tooltip legend-outline"><i className="bi bi-plus-circle-dotted"></i>15</a> |
                    <a className="xanax-tooltip legend-outline"><i className="bi bi-capsule"></i>3</a> |
                    <a className="expected-attacks-tooltip legend-outline"> <i className="bi bi-crosshair"></i>30</a> |
                    <a className="meds-tooltip legend-outline"> <i className="bi bi-heart-pulse"></i>10</a> |
                    <a className="ipecac-tooltip legend-outline"> <i className="bi bi-droplet"></i>3</a></p>
                
                    <Tooltip anchorSelect=".xanax-warning-tooltip" place="top-start">
                        Under performed on attacks (based on Xanax taken).
                    </Tooltip>
                    <Tooltip anchorSelect=".legend-respect" place="top-start">
                        Total respect earned.
                    </Tooltip>
                    <Tooltip anchorSelect=".attacks-tooltip" place="top-start">
                         Attacks on war targets.
                    </Tooltip>
                    <Tooltip anchorSelect=".outside-attacks-tooltip" place="top-start">
                        Attacks on non war targets.
                    </Tooltip>
                    <Tooltip anchorSelect=".legend-participation" place="top-start">
                        % of total faction attacks.
                    </Tooltip>
                    <Tooltip anchorSelect=".xanax-tooltip" place="top-start">
                        Faction Xanax taken.
                    </Tooltip>
                    <Tooltip anchorSelect=".expected-attacks-tooltip" place="top-start">
                        Expected attacks (based on Xanax taken).
                    </Tooltip>
                    <Tooltip anchorSelect=".meds-tooltip" place="top-start">
                        Faction meds used.
                    </Tooltip>
                    <Tooltip anchorSelect=".ipecac-tooltip" place="top-start">
                        Faction ipecac used.
                    </Tooltip>
           
            </div>
        </div>
    )

}
export default LegendReportRow


function LegendReportRow() {

    return (
        
            <ul id="legend-list">
                <li>R: - Respect Earned during wartime</li>
                <li><i className="bi bi-bullseye"></i> 20 - War attacks made</li>
                <li>(30%) - % of faction attacks.</li>
                <li><span className=" warning-icon bi bi-exclamation-triangle-fill"></span> - Attack under performance warning.</li>
                <li><i className="bi bi-plus-circle-dotted"></i>15 - Outside attacks</li>
                <li><i className="bi bi-capsule"></i>3 - Faction Xanax used</li>
                <li><i className="bi bi-crosshair"></i>30 - Expected war attacks</li>
                <li><i className="bi bi-heart-pulse"></i>10 - Meds used</li>
                <li><i className="bi bi-droplet"></i>3 - Ipecac used</li>
            </ul>
    
    )

}
export default LegendReportRow

import type { rankedWarReportViewProps } from "../interfaces"
import RankedWarSelector from "./RankedWarSelector"

function RankedWarReportView({ userData }: rankedWarReportViewProps) {
    return (
        <>
            {userData ? (

                <RankedWarSelector faction_id={userData.faction_id} />

            ) : (

                <p className="card">Loading..</p>
            )}

        </>
    )
}

export default RankedWarReportView

import type { rankedWarReportViewProps } from "../interfaces"
import RankedWarSelector from "./RankedWarSelector"

function RankedWarReportView({ userData, errorMsg }: rankedWarReportViewProps) {
  return (
    <>
      {userData ? (

        <RankedWarSelector faction_id={userData.faction_id} />

      ) : (
        <>
          {errorMsg ? (
            <p className="card"><div className="card-content">{errorMsg}</div></p>
          ) : (
            <p className="card">Loading..</p>
          )}

        </>
      )}
    </>
  )
}

export default RankedWarReportView
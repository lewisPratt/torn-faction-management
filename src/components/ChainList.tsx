import type { chainListProps } from "../interfaces"
import ChainRow from "./ChainRow"

function ChainList({ list }: chainListProps) {

    if (!list) return

    return (

        <div className="card">
            {Object.entries(list).map(([_mapKey, chainData]) => {
                return <ChainRow chain={chainData}/>
            })}
        </div>








    )


}

export default ChainList
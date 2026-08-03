import type { chainRowProps } from "../interfaces"


function ChainRow({chain} : chainRowProps){
    console.log("New test! ",chain)
return (
    <div>Im a chain row {chain.chain}</div>
)

}

export default ChainRow
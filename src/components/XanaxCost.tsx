
import { Tooltip } from 'react-tooltip'

import type { xanaxCostProps } from '../interfaces'


function XanaxCost({ totalNumber, averagePrice }: xanaxCostProps) {


    const tooltipText = `Based on current average price of $${averagePrice.toLocaleString()}.`


    return (
        <>
            <p> <span data-tooltip-id="xanax-cost-tooltip" data-tooltip-content={tooltipText} data-tooltip-place="top">{totalNumber} Xanax used at a cost of ${(totalNumber * averagePrice).toLocaleString()}</span></p>
            <Tooltip id="xanax-cost-tooltip" />
        </>
    )
}

export default XanaxCost
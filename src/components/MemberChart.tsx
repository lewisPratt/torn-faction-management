import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js'
import { Bar, Line, } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)
interface memberChartProps {
    memberId: number
}

interface parsedDataObject {
    [memberId: string]: {
        [warId: string]: {
            warEnd: number
            opponentName: string
            warScore: number
            xanaxTaken: number
            memberAttacks: number
            participationPerc: number
            wartimeAttacksTotal: number
            attackPotential: number
            medsUsed: number
            ipecacUsed: number
        }
    }
}
interface warObject {
    [warId: string]: {
        warEnd: number
        opponentName: string
        warScore: number
        xanaxTaken: number
        memberAttacks: number
        participationPerc: number
        wartimeAttacksTotal: number
        attackPotential: number
        medsUsed: number
        ipecacUsed: number
    }
}

function MemberChart({ memberId }: memberChartProps) {


    //grab the memberslog item 
    const loggedMembers = localStorage.getItem("memberLogs")
    let memberWars: warObject
    if (loggedMembers) {
        const parsedData: parsedDataObject = JSON.parse(loggedMembers)

        if (Object.keys(parsedData).includes(memberId.toString())) {
            // Define datasets for each member stat
            let xanaxUsedDataset: number[] = []
            let warLabels: string[] = []
            let warTargetAttacksDataset: number[] = []
            let participationPercDataset: number[] = []
            let outsideAttacksDataset: number[] = []
            let attackPotentialDataset: number[] = []
            let scoreDataset: number[] = []

            memberWars = parsedData[memberId.toString()]
            console.log(memberWars)
            Object.values(memberWars).forEach((warEntry) => {
                xanaxUsedDataset.push(warEntry.xanaxTaken)
                warLabels.push(warEntry.opponentName)
                warTargetAttacksDataset.push(warEntry.memberAttacks)
                participationPercDataset.push(warEntry.participationPerc)
            })

            console.log()
            const options = {
                responsive: true,
                maintainAspectRatio: true,

            }
            const data = {
                labels: warLabels,
                datasets: [
                    {
                        label: 'Xanax Used',
                        data: xanaxUsedDataset,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        hidden: true

                    },
                    {
                        label: 'Attacks Total',
                        data: warTargetAttacksDataset,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1

                    },
                    {
                        label: 'Participation %',
                        data: participationPercDataset,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        hidden: true

                    }
                ]
            }

            return (
                <>
                    <div className="line-graph-container">
                        <Line data={data} options={options} />
                    </div>
                </>
            )
        }
        else {
            return <p>No locally stored data for chart to display</p>
        }
    }




}

export default MemberChart
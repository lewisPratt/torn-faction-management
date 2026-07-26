import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { warObject } from '../interfaces'
import type { TooltipItem } from 'chart.js'

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


function MemberChart({ memberId }: memberChartProps) {


    //grab the memberslog item 
    const loggedMembers = localStorage.getItem("localLogs")
    let memberWars: warObject
    if (loggedMembers) {
        const parsedData: parsedDataObject = JSON.parse(loggedMembers)

        if (Object.keys(parsedData).includes(memberId.toString())) {
            // Define datasets for each member stat
            let xanaxUsedDataset: number[] = []
            let warLabels: string[] = []
            let warTargetAttacksDataset: number[] = []
            let participationPercDataset: number[] = []
            let scoreDataset: number[] = []
            let warEndDates: string[] = []

            memberWars = parsedData[memberId.toString()]
            Object.values(memberWars).forEach((warEntry) => {
                const warEnd = new Date(warEntry.warEnd * 1000)
                const formattedDate = warEnd.toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' });

                warEndDates.push(formattedDate)
                xanaxUsedDataset.push(warEntry.xanaxTaken)
                warLabels.push(warEntry.opponentName)
                warTargetAttacksDataset.push(warEntry.memberAttacks)
                participationPercDataset.push(warEntry.participationPerc)
                scoreDataset.push(warEntry.warScore)
            })

            const options = {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 10
                },
                scales: {
                    x: {
                        ticks: {
                            align: 'inner' as const
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context: TooltipItem<'line'>) => {
                                const index = context.dataIndex
                                const date = warEndDates[index]
                                return [
                                    `${context.dataset.label}: ${context.formattedValue}`,
                                    `End date: ${date}` 
                                ]
                            }
                        }
                    }
                }
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
                        label: 'War Attacks',
                        data: warTargetAttacksDataset,
                        fill: false,
                        borderColor: 'rgba(255, 78, 69, 0.5)',
                        tension: 0.1

                    },
                    {
                        label: 'Participation %',
                        data: participationPercDataset,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        hidden: true

                    },
                    {
                        label: 'Score',
                        data: scoreDataset,
                        fill: false,
                        borderColor: 'rgb(220, 255, 107)',
                        tension: 0.1,
                        hidden: true

                    }
                ]
            }

            return (
                <>
                    <h3>Historical Performance</h3>
                    <div className="line-graph-container">
                        <Line data={data} options={options} />
                    </div>

                </>
            )
        }
        else {
            return (
                <>
                    <h3>Historical Performance</h3>
                    <p className="no-local-data-p">No locally stored data to display.</p>
                </>
            )
        }
    }




}

export default MemberChart
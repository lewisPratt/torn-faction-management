import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { warChartProps, warMemberDataType } from '../interfaces'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)



function WarChart({ warMemberData }: warChartProps) {
    console.log(warMemberData)
    let memberLabels: string[] = []
    //add all faction member names to array
    warMemberData.map((mapEntry) => {
        memberLabels.push(Object.values(mapEntry)[0].name)
    })


    // Define datasets for each member stat
    let xanaxUsedDataset: number[] = []
    let attacksTotalDataset: number[] = []
    let participationPercDataset: number[] = []
    warMemberData.map((mapEntry) => {
        xanaxUsedDataset.push(Object.values(mapEntry)[0].xanaxUsed)
    })

    warMemberData.map((mapEntry) => {
        attacksTotalDataset.push(Object.values(mapEntry)[0].war_attacks)
    })

    warMemberData.map((mapEntry) => {
        participationPercDataset.push(Object.values(mapEntry)[0].participation_perc)
    })

    const data = {
        labels: memberLabels,
        datasets: [
            {
                label: 'XanaxUsed',
                data: xanaxUsedDataset,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: 'Attacks',
                data: attacksTotalDataset,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(255, 78, 69, 0.5)',
            },
            {
                label: 'Participation %',
                data: participationPercDataset,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(103, 255, 69, 0.5)',
            }
        ]
    }

    return <Bar data={data} />
}

export default WarChart
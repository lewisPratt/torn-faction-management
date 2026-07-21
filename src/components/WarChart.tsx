import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js'
import { Bar, Doughnut,Pie } from 'react-chartjs-2'
import type { warChartProps } from '../interfaces'

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
    let outsideAttacksDataset: number[] = []
    let attackPotentialDataset: number[] = []
    let scoreDataset : number[] = []

    warMemberData.map((mapEntry) => {
        xanaxUsedDataset.push(Object.values(mapEntry)[0].xanaxUsed)
    })

    warMemberData.map((mapEntry) => {
        attacksTotalDataset.push(Object.values(mapEntry)[0].war_attacks)
    })

    warMemberData.map((mapEntry) => {
        participationPercDataset.push(Object.values(mapEntry)[0].participation_perc)
    })

    warMemberData.map((mapEntry) => {
        outsideAttacksDataset.push(Object.values(mapEntry)[0].outside_attacks)
    })

    warMemberData.map((mapEntry) => {
        attackPotentialDataset.push(Object.values(mapEntry)[0].attackPotential)
    })
      warMemberData.map((mapEntry) => {
        scoreDataset.push(Object.values(mapEntry)[0].score)
    })
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis:  'y' as const
    }
    const data = {
        labels: memberLabels,
        datasets: [
            {
                label: 'Xanax Used',
                data: xanaxUsedDataset,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                hidden: true
            },
            {
                label: 'War Attacks',
                data: attacksTotalDataset,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(255, 78, 69, 0.5)',
            },
            {
                label: 'Participation %',
                data: participationPercDataset,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(103, 255, 69, 0.5)',
                hidden: true
            },
            {
                label: 'Outside Attacks',
                data: outsideAttacksDataset,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(255, 222, 11, 0.5)',
                hidden: true

            },
            {
                label: 'Attack Potential',
                data: attackPotentialDataset,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(52, 59, 254, 0.5)',
                
            },
            {
                label: 'Respect Score',
                data: scoreDataset,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(119, 230, 255, 0.5)',
                hidden: true,
                
            }
        ]
    }

    return <Bar data={data}  options={options}/>
}

export default WarChart
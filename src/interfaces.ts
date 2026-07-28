import type { Dispatch, SetStateAction } from "react"

export interface TornUserData {
    name: string
    id: number
    level: number
    image: string
    rank: string
    title: string
    faction_id: number
}
export interface firstViewProps {
    userData: TornUserData
    handleClearKey: () => void
    errorMsg: string
    apiKey: string
}
export interface LayoutProps {
    children: React.ReactNode
    handleClearKey: () => void
}
export interface ApiKeyFormProps {
    inputValue: string
    setInputValue: (value: string) => void
    handleSubmit: () => void
}
export interface ClearKeyProps {
    handleClearKey: () => void
}
export interface factionProps {
    uData: any
    apiKey: string
}

export interface FactionMember {
    name: string
    level: number
}

export interface FactionData {
    ID: number
    name: string
    leader: number
    age: number
    members: number
    rank: {
        division: number
        level: number
        name: string
        wins: number
    }
}
export interface RankedWarProps {
    apiKey: string
    faction_id: number

}
export interface RankedWarsListData {
    [key: string]: {
        end: number
        id: number
        start: number
        factions: {
            "0": {
                id: number
                name: string
                chain: number
                score: number
            }
            "1": {
                id: number
                name: string
                chain: number
                score: number
            }
        }
        winner: number
        target: number

    }
}

export interface ProfilePictureProps {
    id: number
    profile_image: string
}


export interface SelectedWar {
    end: number
    id: number
    start: number
    target: number
    winner: number
    factions: {
        [key: string]: {
            id: number
            chain: number
            name: string
            score: number
        }

    }
}
export interface warReportProps {
    factionId: number
    opponentName: string
    warId: number
    warStart: number
    warEnd: number
    target: number
    armouryTime: number
    warReward: number
    splitType: string
}

export interface ReportData {
    attacks: number
    members: {
        [key: string]: {
            attacks: number
            id: number
            level: number
            name: string
            score: number
        }
    }
    rewards: {
        [key: string]: {
            respect: number
            points: number
            items: {
                [key: string]: {
                    id: number
                    name: string
                    quantity: number
                }
            }
        }
    }
}
export interface membersArmouryNews {
    xanaxUsed: number
    medsUsed: number
    ipecacUsed: number
    attackPotential: number
}
export interface MemberRow {
    filteredNews: membersArmouryNews | null
    memberId: number
    warId: number
    memberName: string
    memberAttacks: number
    wartimeAttacks: number
    memberScore: number
    participationNumber: number
    participationBarWidth: string
    participationBarClass: string
    armouryTime: number
    warEndDate: number
    opponentName: string
    setLocalDataChange: Dispatch<SetStateAction<boolean>>
    memberPayout : string

}
export interface MembersArmouryProps {
    memberId: number
    memberName: string
    armouryFromDate: number
    warEndDate: number
}

export interface armouryNewsData {
    id: number
    text: string
    timestamp: number

}
export interface warMemberDataType {
    [memberId: number]: {
        xanaxUsed: number
        medsUsed: number
        ipecacUsed: number
        attackPotential: number
        war_attacks: number
        outside_attacks: number
        name: string
        score: number
        participation_perc: number
        war_id: number
    }

}

export interface warChartProps {
    warMemberData: warMemberDataType[]
}

export interface warObject {
    [warId: number]: {
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

export interface localStoreProps {
    warObject: warObject
    memberId: number
    warId: number
    setLocalDataChange: Dispatch<SetStateAction<boolean>>

}
export interface parsedLogsShape {
    [memberId: number]: warObject
}

export interface fullAttacksData {
    attacker: {
        id: number
    }
}
export interface thisMemberDetailsProps {
    memberId: number
}
export interface memberDetailsData {
    lastActive: string
    donatorStatus: string
    level: number
}
export interface opponentObject {
    id: number
    chain: number
    name: string
    score: number
}

export interface memberChartProps {
    memberId: number
}

export interface parsedDataObject {
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

export interface xanaxCostProps {
    totalNumber: number
}
export interface clearLocalProps {
    setLocalDataChange: Dispatch<SetStateAction<boolean>>

}

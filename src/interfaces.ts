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
    warId: number
    warStart: number
    warEnd: number
    target: number
    armouryTime: number
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

export interface MemberRow {
    armouryNews: armouryNewsData[] | null
    memberId: number
    memberName: string
    memberAttacks: number
    memberScore: number
    participationNumber: number
    participationBarWidth: string
    participationBarColour: string
    armouryTime: number
    warEndDate: number

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
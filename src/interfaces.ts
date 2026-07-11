export interface TornUserData {
  name: string
  id: number
  level: number
  image: string
  rank: string
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
  handleClearKey : () => void
}
export interface factionProps {
    uData: any
    apiKey: string
}

export interface FactionMember{
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
        start: number
        factions: {
            [key: string]: {
                id: number
                name: string
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


export interface SelectedWar{

}

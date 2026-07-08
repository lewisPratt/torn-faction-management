export interface TornUserData {
  name: string
  player_id: number
  level: number
  profile_image: string
  rank: string
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
    members: {
        [key : string] : FactionMember
    }
    rank: {
        division: number
        level: number
        name: string
        wins: number
    }
}
export interface ProfilePictureProps {
  player_id: number
  profile_image: string
}

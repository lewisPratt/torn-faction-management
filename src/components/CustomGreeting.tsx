import ProfilePicture from "./ProfilePicture"

interface TornUserData {
  name: string
  player_id: number
  level: number
  profile_image: string
  rank: string
}

function CustomGreeting({ uData }: { uData: TornUserData }) {
  return (
    <div className="player-card">
      <ProfilePicture image={uData} />
      <div>
        <p>Welcome back {uData.name}</p>
        <p id='rank-text'>Level {uData.level} {uData.rank}</p>
      </div>
    </div>
  )
}

export default CustomGreeting
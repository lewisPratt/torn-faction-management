import ProfilePicture from "./ProfilePicture"
import type { TornUserData } from "../interfaces"

function CustomGreeting({ uData }: { uData: TornUserData }) {
  return (
    <div className="player-card">
      <ProfilePicture 
      id={uData.id}
      profile_image={uData.image} />
      <div>
        <p>Welcome back {uData.name}</p>
        <p id='rank-text'>Level {uData.level} {uData.rank}</p>
      </div>
    </div>
  )
}

export default CustomGreeting
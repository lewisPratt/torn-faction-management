import ProfilePicture from "./ProfilePicture"
import type { TornUserData } from "../interfaces"

function CustomGreeting({ id, image, name, rank, title, level }: TornUserData) {

 

  return (
    <div className="player-card">
      <ProfilePicture
        id={id}
        profile_image={image} />
     
      <div>
        <p>Welcome back {name}</p>
        <p id='rank-text'>Level {level} {rank} {title}</p>
      </div>
    </div>
  )
}

export default CustomGreeting
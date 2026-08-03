import ProfilePicture from "./ProfilePicture"
import type { TornUserData } from "../interfaces"

function CustomGreeting({ id, image, name, rank, title, level }: TornUserData) {

  return (
    <header>
    <div className="header-card">

      <h1>Torn Ledger</h1>
      <div>
        <div id="header-welcome">
          <ProfilePicture
            id={id}
            profile_image={image} />
          <div>
            <h2>{name}</h2>
            <p id='rank-text'>Level {level} {rank} {title}</p>
          </div>
        </div>
      </div>
    </div>
    </header>
  )
}

export default CustomGreeting
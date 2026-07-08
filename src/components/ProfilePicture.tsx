import type { ProfilePictureProps } from "../interfaces"

function ProfilePicture({player_id, profile_image} : ProfilePictureProps){

  return(
    <div className="profile-image">
      <a href={`https://www.torn.com/profiles.php?XID=${player_id}`} target="_blank"> <img src={profile_image} alt="Users profile image"  /></a>
    </div>
  )
}

export default ProfilePicture
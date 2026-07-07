function ProfilePicture({image} : {image: any}){
    console.log(image.name)

  return(
    <div className="profile-image">
      <a href={'https://www.torn.com/profiles.php?XID=' + image.player_id} target="_blank"> <img src={image.profile_image} alt="Users profile image"  /></a>
    </div>
  )
}

export default ProfilePicture
import ProfilePicture from "./ProfilePicture"

function CustomGreeting({ uData }: { uData: any }){
  return(
    <div className="player-card">
      <ProfilePicture image={uData} />
      <p>Welcome back {uData.name}</p>
    </div>
  )
}

export default CustomGreeting
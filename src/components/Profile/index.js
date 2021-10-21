import './index.css'

const Profile = props => {
  const {profileData} = props
  const {name, profileImageUrl, shortBio} = profileData

  return (
    <div className="profile-container">
      <img className="profile-image" src={profileImageUrl} alt="" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-details">{shortBio}</p>
    </div>
  )
}

export default Profile

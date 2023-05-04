import { useContext } from 'react'
import './Profile.pcss'
import ProfileAvatar from './ProfileAvatar'
import ProfileBody from './ProfileBody'
import { UserContext } from '../../context/UserContext'

const Profile = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      {user ? (
        <div className="profile-container">
          <ProfileAvatar avatar={user.avatar} />
          <ProfileBody user={user} />
        </div>
      ) : (
        <p>Пользователь не загружен</p>
      )}
    </>
  )
}

export default Profile

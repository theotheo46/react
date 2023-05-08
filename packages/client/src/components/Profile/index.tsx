import { useContext } from 'react'
import './Profile.pcss'
import ProfileAvatar from './ProfileAvatar'
import ProfileBody from './ProfileBody'
import { UserContext } from '../../context/UserContext'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <>
      {user ? (
        <div className="profile-container">
          <ProfileAvatar avatar={user.avatar} />
          <ProfileBody user={user} />
        </div>
      ) : (
        <div className="profile-container">
          <h3>Пользователь не загружен</h3>

          <div className="profile-body__buttons">
            <Button
              onClick={() => navigate('/signin')}
              type="button"
              padding="0px 0px"
              height="24px"
              margin="0 0 24px 0"
              styleType="link">
              Войти в аккаунт
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile

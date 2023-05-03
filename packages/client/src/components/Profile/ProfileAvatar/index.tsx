import { useState } from 'react'
import defaultAvatar from '../../../assets/images/default-avatar.jpg'
import './ProfileAvatar.pcss'
import { createPortal } from 'react-dom'
import Modal from '../../Modal'
import ProfileChangeAvatar from '../ProfileChangeAvatar'

interface Props {
  avatar: string
}

const ProfileAvatar = ({ avatar }: Props) => {
  const [isUpdateAvatarModal, setIsUpdateAvatarModal] = useState(false)

  function modalHandler() {
    setIsUpdateAvatarModal(prev => !prev)
  }

  return (
    <>
      <div className="profile-avatar">
        <div onClick={modalHandler} className="profile-avatar__block">
          <img
            src={
              avatar
                ? `https://ya-praktikum.tech/api/v2/resources${avatar}`
                : defaultAvatar
            }
            className="profile-avatar__image"
          />
          <div className="profile-avatar__overlay">Изменить</div>
        </div>
      </div>
      {isUpdateAvatarModal &&
        createPortal(
          <Modal onClose={modalHandler} title="Обновить аватар">
            <ProfileChangeAvatar />
          </Modal>,
          document.body
        )}
    </>
  )
}

export default ProfileAvatar

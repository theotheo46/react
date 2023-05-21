import Input from '../../Input'
import { FormEvent, useState } from 'react'
import './ProfileBody.pcss'
import Button from '../../Button'
import { createPortal } from 'react-dom'
import Modal from '../../Modal'
import ProfileChangePassword from '../ProfileChangePassword'
import isEqual from '../../../helpers/isEqual'
import { User } from '../../../store/slices/userSlice/types'
import { useAppDispatch } from '../../../store/hooks'
import { updateUser } from '../../../store/slices/userSlice/userAsyncThunks'

interface Props {
  user: User
}

const ProfileBody = ({ user }: Props) => {
  const [userLocal, setUserLocal] = useState<User>(user)
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const dispatch = useAppDispatch()

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, id } = e.target

    setUserLocal(prev => {
      return { ...prev, [id]: value }
    })
  }

  const isSubmit = isEqual(userLocal, user)

  function modalHandler() {
    setIsChangePasswordModal(prev => !prev)
  }

  async function formHandler(e: FormEvent) {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, ...data } = userLocal

    const res = await dispatch(updateUser({ data }))
    if (updateUser.fulfilled.match(res)) {
      setSuccessMessage('Данные обновлены!')
    }
  }

  return (
    <div className="profile-body">
      {successMessage && (
        <div className="success-text-message">{successMessage}</div>
      )}
      <form onSubmit={formHandler} className="profile-body__form">
        <Input
          name="first_name"
          type="text"
          label="Имя"
          onChange={inputHandler}
          value={userLocal.first_name}
        />
        <Input
          name="second_name"
          type="text"
          label="Фамилия"
          onChange={inputHandler}
          value={userLocal.second_name}
        />
        <Input
          name="display_name"
          type="text"
          label="Никнейм"
          onChange={inputHandler}
          value={userLocal.display_name || ''}
        />
        <Input
          name="email"
          type="text"
          label="Email"
          onChange={inputHandler}
          value={userLocal.email}
        />
        <Input
          name="phone"
          type="text"
          label="Телефон"
          onChange={inputHandler}
          value={userLocal.phone}
        />
        <div className="profile-body__buttons">
          <Button
            onClick={modalHandler}
            type="button"
            padding="0px 0px"
            height="24px"
            styleType="link">
            Изменить пароль
          </Button>
          <Button disabled={isSubmit} type="submit" styleType="primary">
            Сохранить
          </Button>
        </div>
      </form>
      {isChangePasswordModal &&
        createPortal(
          <Modal onClose={modalHandler} title="Изменить пароль">
            <ProfileChangePassword />
          </Modal>,
          document.body
        )}
    </div>
  )
}

export default ProfileBody

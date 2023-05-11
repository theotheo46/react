import { FormEvent, useState } from 'react'
import Button from '../../Button'
import Input from '../../Input'
import './ProfileChangePassword.pcss'
import { useAppDispatch } from '../../../store/hooks'
import { updatePassword } from '../../../store/slices/userSlice/userAsyncThunks'

const ProfileChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordTo, setNewPasswordTo] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const dispatch = useAppDispatch()

  // TODO: Сделать нормальную валидацию для формы
  const isSubmit =
    !!oldPassword &&
    !!newPassword &&
    !!newPasswordTo &&
    newPassword === newPasswordTo

  async function formHandler(e: FormEvent) {
    e.preventDefault()

    const res = await dispatch(updatePassword({ oldPassword, newPassword }))

    if (updatePassword.fulfilled.match(res)) {
      setOldPassword('')
      setNewPassword('')
      setNewPasswordTo('')
      setSuccessMessage('Пароль изменен!')
    }
  }

  return (
    <div className="change-password">
      {successMessage && (
        <div className="success-text-message">{successMessage}</div>
      )}
      <form onSubmit={formHandler} className="change-password__form">
        <Input
          type="password"
          name="oldPassword"
          label="Старый пароль"
          onChange={e => setOldPassword(e.target.value)}
          value={oldPassword}
        />
        <Input
          type="password"
          name="newPassword"
          label="Новый пароль"
          onChange={e => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <Input
          type="password"
          name="newPasswordTo"
          label="Новый пароль еще раз"
          onChange={e => setNewPasswordTo(e.target.value)}
          value={newPasswordTo}
        />
        <div className="change-password__button">
          <Button disabled={!isSubmit} styleType="primary" type="submit">
            Изменить пароль
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileChangePassword

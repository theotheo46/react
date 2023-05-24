import Input from '../../Input'
import { useState } from 'react'
import './ProfileBody.pcss'
import Button from '../../Button'
import { createPortal } from 'react-dom'
import Modal from '../../Modal'
import ProfileChangePassword from '../ProfileChangePassword'
import isEqual from '../../../helpers/isEqual'
import { User } from '../../../store/slices/userSlice/types'
import { useAppDispatch } from '../../../store/hooks'
import { updateUser } from '../../../store/slices/userSlice/userAsyncThunks'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  REGEX_ERRORS,
  REGULAR_EXPRESSON,
  VALIDATE_FIELDS,
} from '../../../utils/validate-data'

interface Props {
  user: User
}

const ProfileBody = ({ user }: Props) => {
  const [userLocal, setUserLocal] = useState<User>(user)
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  })

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

  const formHandler: SubmitHandler<User> = async userData => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, ...data } = userData

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
      <form
        onSubmit={handleSubmit(() => formHandler(userLocal))}
        className="profile-body__form">
        {VALIDATE_FIELDS.profile.map((field, key) => (
          <Input
            key={key}
            onChange={inputHandler}
            value={userLocal[field.name as keyof User] || ''}
            {...field}
            hasError={!!errors[field.name]}
            refs={register(field.name, {
              required: {
                value: field.required || false,
                message: 'Это поле обязательно для заполнения',
              },
              pattern: {
                value: field.regex || REGULAR_EXPRESSON.MESSAGE,
                message: field.errorText || REGEX_ERRORS.MESSAGE,
              },
            })}
          />
        ))}
        <div className="profile-body__buttons">
          <Button
            onClick={modalHandler}
            type="button"
            padding="0px 0px"
            height="24px"
            styleType="link">
            Изменить пароль
          </Button>
          <Button
            disabled={isSubmit || !isValid}
            type="submit"
            styleType="primary">
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

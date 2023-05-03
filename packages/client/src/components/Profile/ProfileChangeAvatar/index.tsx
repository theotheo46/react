import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react'
import Button from '../../Button'
import './ProfileChangeAvatar.pcss'
import { UserContext } from '../../../context/UserContext'

const ProfileChangeAvatar = () => {
  const [file, setFile] = useState<File>()
  const [successMessage, setSuccessMessage] = useState('')
  const inputFile = useRef<HTMLInputElement | null>(null)
  const { updateAvatar } = useContext(UserContext)

  function changeFileHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const isSubmit = !!file

  function formHandler(e: FormEvent) {
    e.preventDefault()
    if (!file) {
      return
    }
    const data = new FormData()
    data.append('avatar', file)
    updateAvatar(data)
    setSuccessMessage('Аватар обновлен!')
    setFile(undefined)
    if (inputFile.current) {
      inputFile.current.value = ''
    }
  }

  return (
    <div className="change-avatar">
      {successMessage && (
        <div className="success-text-message">{successMessage}</div>
      )}
      <form onSubmit={formHandler} className="change-avatar__form">
        <input
          ref={inputFile}
          onChange={changeFileHandler}
          name="avatar"
          type="file"
        />
        <div className="change-avatar__button">
          <Button type="submit" disabled={!isSubmit} styleType="primary">
            Обновить
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileChangeAvatar

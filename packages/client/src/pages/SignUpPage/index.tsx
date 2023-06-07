import { useState } from 'react'
import Form from '../../components/Form'
import { InputProps } from '../../components/Input'
import { VALIDATE_FIELDS } from '../../utils/validate-data'
import ErrorInformer from '../../components/ErrorInformer'
import './EntryPage.pcss'
import Modal from '../../components/Modal'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../store/hooks'
import { RequestUpdateUserData } from '../../store/slices/userSlice/types'
import {
  createUser,
  getUser,
} from '../../store/slices/userSlice/userAsyncThunks'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import wave from '../../assets/images/wave.png'

const inputs: InputProps[] = VALIDATE_FIELDS.registration
const SignUpPage = () => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleCreateUser: SubmitHandler<Record<string, unknown>> = async (
    data,
    e
  ) => {
    e?.preventDefault()
    const res = await dispatch(
      createUser(data as unknown as RequestUpdateUserData)
    )
    if (createUser.fulfilled.match(res)) {
      await dispatch(getUser())
      navigate('/start')
    } else {
      setError(res.payload || res.error.message || 'Error')
    }
  }
  const handleStartGame = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/start')
  }

  return (
    <main className="entry-page page-wrap">
      <Button
        styleType="secondary"
        onClick={e => handleStartGame(e)}
        className="entry-page-fast-game-btn">
        Оффлайн режим
      </Button>
      <Button
        styleType="link"
        onClick={() => navigate('/')}
        className="entry-page-about-btn">
        О приложении
      </Button>
      <Form
        title="Регистрация"
        className="sign-up-page"
        inputs={inputs}
        buttonLabel="Зарегистрироваться"
        onSubmit={async (data, e) => {
          handleCreateUser(data, e)
        }}
      />
      {error && (
        <Modal
          title="Не удалось создать аккаунт"
          onClose={() => {
            setError('')
          }}>
          <ErrorInformer
            errorCode="401"
            errorText={error}
            errorStatus="Попробуйте создать аккаунт ещё раз."
          />
        </Modal>
      )}
      <img className="entry-page-wave" src={wave} alt="wave" />
    </main>
  )
}

export default SignUpPage

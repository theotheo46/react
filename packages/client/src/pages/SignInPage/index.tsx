import { useState } from 'react'
import Form from '../../components/Form'
import { InputProps } from '../../components/Input'
import { VALIDATE_FIELDS } from '../../utils/validate-data'
import ErrorInformer from '../../components/ErrorInformer'
import Modal from '../../components/Modal'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../store/hooks'
import {
  getUser,
  loginUser,
} from '../../store/slices/userSlice/userAsyncThunks'
import { RequestLoginData } from '../../store/slices/userSlice/types'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import wave from '../../assets/images/wave.png'

const inputs: InputProps[] = VALIDATE_FIELDS.login
const SignInPage = () => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin: SubmitHandler<Record<string, unknown>> = async (
    data,
    e
  ) => {
    e?.preventDefault()
    const res = await dispatch(loginUser(data as unknown as RequestLoginData))

    if (loginUser.fulfilled.match(res)) {
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
        title="Войти в профиль"
        className="sign-in-page"
        inputs={inputs}
        buttonLabel="Войти"
        onSubmit={async (data, e) => {
          handleLogin(data, e)
        }}
      />
      {error && (
        <Modal
          title="Не удалось войти в аккаунт"
          onClose={() => {
            setError('')
          }}>
          <ErrorInformer
            errorCode="401"
            errorText={error}
            errorStatus="Попробуйте ещё раз войти в аккаунт"
          />
        </Modal>
      )}
      <img className="entry-page-wave" src={wave} alt="wave" />
    </main>
  )
}

export default SignInPage

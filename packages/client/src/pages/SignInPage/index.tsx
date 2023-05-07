import { useContext, useEffect, useState } from 'react'
import Form from '../../components/Form'
import { InputProps } from '../../components/Input'
import { VALIDATE_FIELDS } from '../../utils/validate-data'
import { RequestLoginData, UserContext } from '../../context/UserContext'
import ErrorInformer from '../../components/ErrorInformer'
import Modal from '../../components/Modal'
import { SubmitHandler } from 'react-hook-form'

const inputs: InputProps[] = VALIDATE_FIELDS.login
const SignInPage = () => {
  const { loginUser, error: errorContext } = useContext(UserContext)
  const [error, setError] = useState(errorContext)
  const handleLogin: SubmitHandler<Record<string, unknown>> = async (
    data,
    e
  ) => {
    e?.preventDefault()
    console.log('log data: ', data)
    await loginUser(data as unknown as RequestLoginData)
  }

  useEffect(() => {
    setError(errorContext)
  }, [errorContext])

  return (
    <main className="entry-page page-wrap">
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
          title="Окно с ошибкой"
          onClose={() => {
            setError('')
          }}>
          <ErrorInformer
            errorText={error}
            errorStatus="Ошибка при попытке входа в аккаунт"
          />
        </Modal>
      )}
      <img className="entry-page-wave" src="wave.png" alt="wave" />
    </main>
  )
}

export default SignInPage

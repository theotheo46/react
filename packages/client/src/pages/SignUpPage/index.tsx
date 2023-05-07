import { useContext, useEffect, useState } from 'react'
import Form from '../../components/Form'
import { InputProps } from '../../components/Input'
import { VALIDATE_FIELDS } from '../../utils/validate-data'
import { RequestUpdateUserData, UserContext } from '../../context/UserContext'
import ErrorInformer from '../../components/ErrorInformer'
import './EntryPage.pcss'
import Modal from '../../components/Modal'
import { SubmitHandler } from 'react-hook-form'

const inputs: InputProps[] = VALIDATE_FIELDS.registration
const SignUpPage = () => {
  const { createUser, error: errorContext } = useContext(UserContext)
  const [error, setError] = useState(errorContext)
  const handleCreateUser: SubmitHandler<Record<string, unknown>> = async (
    data,
    e
  ) => {
    e?.preventDefault()
    console.log('log data: ', data)
    await createUser(data as unknown as RequestUpdateUserData)
  }

  useEffect(() => {
    setError(errorContext)
  }, [errorContext])

  return (
    <main className="entry-page page-wrap">
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
          title="Окно с ошибкой"
          onClose={() => {
            setError('')
          }}>
          <ErrorInformer
            errorText={error}
            errorStatus="Ошибка при попытке создания аккаунта"
          />
        </Modal>
      )}
      <img className="entry-page-wave" src="wave.png" alt="wave" />
    </main>
  )
}

export default SignUpPage

import Form from '../../components/Form'
import { InputProps } from '../../components/Input'
import { VALIDATE_FIELDS } from '../../utils/validate-data'

const inputs: InputProps[] = VALIDATE_FIELDS.login
const SignInPage = () => {
  return (
    <main className="entry-page page-wrap">
      <Form
        title="Войти в профиль"
        className="sign-in-page"
        inputs={inputs}
        buttonLabel="Войти"
        onSubmit={() => {
          console.log('submit!')
        }}
      />
      <img className="entry-page-wave" src="wave.png" alt="wave" />
    </main>
  )
}

export default SignInPage

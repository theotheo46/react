import Form from '../../components/Form'
import { InputProps } from '../../components/Input'
import { VALIDATE_FIELDS } from '../../utils/validate-data'
import './EntryPage.pcss'

const inputs: InputProps[] = VALIDATE_FIELDS.registration
const SignUpPage = () => {
  return (
    <main className="entry-page page-wrap">
      <Form
        title="Регистрация"
        className="sign-up-page"
        inputs={inputs}
        buttonLabel="Зарегистрироваться"
        onSubmit={() => {
          console.log('submit!')
        }}
      />
      <img className="entry-page-wave" src="wave.png" alt="wave" />
    </main>
  )
}

export default SignUpPage

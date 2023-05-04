import Form from '../../components/Form'
import { InputProps } from '../../components/Input'
import { VALIDATE_FIELDS } from '../../utils/validate-data'
import './SignUpPage.pcss'

const SignUpPage: React.FC = () => {
  const inputs: InputProps[] = VALIDATE_FIELDS.registration

  return (
    <div className="entry-page">
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
    </div>
  )
}

export default SignUpPage

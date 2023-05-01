import Form from '../../components/Form'
import { InputProps } from '../../components/Input'
import './SignUpPage.pcss'

const SignUpPage: React.FC = () => {
  const inputs: InputProps[] = [
    { name: 'first-name', label: 'Имя' },
    { name: 'last-name', label: 'Фамилия' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Телефон', type: 'tel' },
    { name: 'login', label: 'Логин' },
    { name: 'password', label: 'Пароль', type: 'password' },
  ]
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

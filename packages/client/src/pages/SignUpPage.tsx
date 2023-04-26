import Input from '../components/Input'

const SignUpPage: React.FC = () => {
  return (
    <>
      <h1>SignUp page</h1>
      <Input name="first-name" label="Имя" />
      <Input name="last-name" label="Фамилия" />
      <Input name="email" type="email" label="Email" />
    </>
  )
}

export default SignUpPage

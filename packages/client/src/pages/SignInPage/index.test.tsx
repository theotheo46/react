import { render, screen} from '@testing-library/react'
import SignInPage from './index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from '../../store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import { REGEX_ERRORS } from '../../utils/validate-data'

const page: React.ReactElement = (
  <BrowserRouter><Provider store={store}><Routes><Route path="/" element={<SignInPage />} /></Routes></Provider></BrowserRouter>
)

describe('SignIn page', () => {

test('elements check', () => {
  const { container } = render(page)
  const loginInput = container.querySelector('#login')
  const passwordInput = container.querySelector('#password')
  expect(loginInput).toBeTruthy()
  expect(passwordInput).toBeTruthy()
})

test('integration test false', async () => {
  const user = userEvent.setup()
  const { container } = render(page)
  const loginInput = container.querySelector('#login') as HTMLInputElement
  const passwordInput = container.querySelector('#password') as HTMLInputElement
  const button  = screen.getByText('Войти')
  await user.type(loginInput, "1")
  await user.type(passwordInput, "1")
  await user.click(button);
  expect(screen.getByText(REGEX_ERRORS.LOGIN)).toBeTruthy()
  expect(screen.getByText(REGEX_ERRORS.PASSWORD)).toBeTruthy()
})


test('integration test true', async () => {
  const user = userEvent.setup()
  const { container } = render(page)
  const loginInput = container.querySelector('#login') as HTMLInputElement
  const passwordInput = container.querySelector('#password') as HTMLInputElement
  const button  = screen.getByText('Войти')
  await user.type(loginInput, "theo1")
  await user.type(passwordInput, "Aaa101010")
  await user.click(button);
  expect(screen.queryByText(REGEX_ERRORS.LOGIN)).toBeFalsy()
  expect(screen.queryByText(REGEX_ERRORS.PASSWORD)).toBeFalsy()
})
})


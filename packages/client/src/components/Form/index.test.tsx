import { render, screen } from '@testing-library/react'
import Form from './index'
import { InputProps } from '../../components/Input'
import { VALIDATE_FIELDS } from '../../utils/validate-data'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { REGEX_ERRORS } from '../../utils/validate-data'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../store'

const inputs: InputProps[] = VALIDATE_FIELDS.login
const mockSave = jest.fn()
const reactForm: React.ReactElement = (
  <BrowserRouter>
    {' '}
    <Provider store={store}>
      <Form
        title="Войти в профиль"
        className="sign-in-page"
        inputs={inputs}
        buttonLabel="Войти"
        onSubmit={mockSave}
      />
    </Provider>
  </BrowserRouter>
)

describe('Form component', () => {
  test('elements check', () => {
    const { container } = render(reactForm)
    const loginInput = container.querySelector('#login')
    const passwordInput = container.querySelector('#password')
    expect(loginInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()
  })

  test('false validation check', async () => {
    inputs[0].value = '1'
    inputs[1].value = '1'
    const user = userEvent.setup()
    render(reactForm)
    const loginInput = screen.getByLabelText('Логин')
    const passwordInput = screen.getByLabelText('Пароль')
    await user.click(loginInput)
    await user.click(passwordInput)
    await user.click(loginInput)
    expect(screen.getByText(REGEX_ERRORS.LOGIN)).toBeTruthy()
    expect(screen.getByText(REGEX_ERRORS.PASSWORD)).toBeTruthy()
  })

  test('true validation check', async () => {
    inputs[0].value = 'theo1'
    inputs[1].value = 'Aaa101010'
    const user = userEvent.setup()
    render(reactForm)
    const loginInput = screen.getByLabelText('Логин')
    const passwordInput = screen.getByLabelText('Пароль')
    await user.click(loginInput)
    await user.click(passwordInput)
    await user.click(loginInput)
    expect(screen.queryByText(REGEX_ERRORS.LOGIN)).toBeFalsy()
    expect(screen.queryByText(REGEX_ERRORS.PASSWORD)).toBeFalsy()
  })
})

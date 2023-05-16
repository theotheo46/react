import { render, screen} from '@testing-library/react';
import Form  from './index';
import  { InputProps } from '../../components/Input'
import { VALIDATE_FIELDS} from '../../utils/validate-data'
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { REGEX_ERRORS} from '../../utils/validate-data'


const inputs: InputProps[] = VALIDATE_FIELDS.login;
const mockSave = jest.fn();
const reactForm : React.ReactElement = <BrowserRouter> <Form title="Войти в профиль" className="sign-in-page" inputs={inputs} buttonLabel="Войти" onSubmit={mockSave} /></BrowserRouter>;

test('form subcomponents check', () => {
  const { container } = render(reactForm);
  const loginInput = container.querySelector('#login');
  const passwordInput = container.querySelector('#password');
  expect(loginInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
});

test('form false validation check',  async () => {
  inputs[0].value = "1";
  inputs[1].value = "1";
  const user = userEvent.setup();
  render(reactForm);
  const loginInput  = screen.getByLabelText("Логин") as HTMLInputElement;
  const passwordInput = screen.getByLabelText("Пароль") as HTMLInputElement;
  await user.click(loginInput);
  await user.click(passwordInput);
  await user.click(loginInput);
  expect(screen.getByText(REGEX_ERRORS.LOGIN)).toBeTruthy();
  expect(screen.getByText(REGEX_ERRORS.PASSWORD)).toBeTruthy();
});


test('form true validation check',  async () => {
  inputs[0].value = "theo1";
  inputs[1].value = "Aaa101010";
  const user = userEvent.setup();
  render(reactForm);
  const loginInput  = screen.getByLabelText("Логин") as HTMLInputElement;
  const passwordInput = screen.getByLabelText("Пароль") as HTMLInputElement;
  await user.click(loginInput);
  await user.click(passwordInput);
  await user.click(loginInput);
  expect(screen.queryByText(REGEX_ERRORS.LOGIN)).toBeFalsy()
  expect(screen.queryByText(REGEX_ERRORS.PASSWORD)).toBeFalsy();
});




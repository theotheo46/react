import { render, screen } from '@testing-library/react';
import Input , { InputProps } from './index';
import { VALIDATE_FIELDS} from '../../utils/validate-data'

const inputProps: InputProps = VALIDATE_FIELDS.login[0];
const inputText = 'test';
const errorLabelContainerClass = 'error-label error';
inputProps.hasError = true;

test('input text check', () => {
  const { container } = render(<Input {...inputProps} value={inputText} onChange ={ () => {;}}></Input>);
  const input = screen.getByDisplayValue(inputText)
  expect(input).toBeTruthy();
  expect(container.getElementsByClassName(errorLabelContainerClass).length).toBe(1);
  //screen.debug();
  //expect(input.innerText).toBe('$23')
  //console.log(screen.getByText(inputText));
});



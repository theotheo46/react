import { render, screen } from '@testing-library/react'
import Input, { InputProps } from './index'
import { VALIDATE_FIELDS } from '../../utils/validate-data'

const inputProps: InputProps = VALIDATE_FIELDS.login[0]
const inputText = 'test'

test('Inout component text check', () => {
  const mockSave = jest.fn()
  render(
    <Input {...inputProps} value={inputText} onChange={mockSave}></Input>
  )
  const input = screen.getByDisplayValue(inputText)
  expect(input).toBeTruthy()
})

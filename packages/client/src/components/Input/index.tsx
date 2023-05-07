import React from 'react'
import './Input.pcss'
import { UseFormRegisterReturn } from 'react-hook-form'

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  label: string
  regex?: RegExp
  errorText?: string
  hasError?: boolean
  refs?: UseFormRegisterReturn<string>
  className?: string
  padding?: string
  margin?: string
}

const Input = ({
  name,
  errorText,
  label,
  className = '',
  hasError,
  refs,
  height,
  width,
  padding,
  margin,
  ...rest
}: InputProps) => {
  const inputStyle = {
    padding,
    margin,
    height,
    width,
  }

  return (
    <label
      htmlFor={name}
      className={'input-wrapper ' + className}
      style={inputStyle}>
      <input
        id={name}
        className="input"
        placeholder="&nbsp;"
        {...refs}
        {...rest}
      />
      <span className="input-label">{label}</span>
      {hasError && <div className="error-label error">{errorText}</div>}
    </label>
  )
}

export default Input

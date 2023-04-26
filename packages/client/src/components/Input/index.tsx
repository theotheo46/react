import React from 'react'
import './Input.pcss'

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  label: string
  className?: string
  padding?: string
  margin?: string
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  className = '',
  height,
  width,
  padding,
  margin,
  ...rest
}) => {
  const inputStyle = {
    padding,
    margin,
    height,
    width
  }

  return (
    <label
      htmlFor={name}
      className={'input-wrapper ' + className}
      style={inputStyle}>
      <input id={name} className="input" placeholder="&nbsp;" {...rest} />
      <span className="input-label">{label}</span>
    </label>
  )
}

export default Input

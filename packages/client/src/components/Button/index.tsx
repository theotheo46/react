import React from 'react'
import './Button.pcss'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  classNames?: string
  children?: React.ReactNode
  styleType?: StyleTypes
  height?: string
  width?: string
  padding?: string
  margin?: string
  onClick?: (event: React.MouseEvent) => void
}

const Button: React.FC<ButtonProps> = ({
  classNames = '',
  styleType = 'primary',
  onClick,
  children,
  height,
  width,
  disabled,
  padding,
  margin,
  ...rest
}) => {
  const currentStyle = disabled ? 'disabled' : styleType

  const buttonStyle = {
    padding,
    margin,
    height,
    width
  }

  return (
    <button
      className={`button  ${classNames} ${currentStyle}`}
      disabled
      style={buttonStyle}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  )
}

export default Button

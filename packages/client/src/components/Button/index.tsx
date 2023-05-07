import React from 'react'
import './Button.pcss'

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string
  children?: React.ReactNode
  styleType?: StyleTypes
  height?: string
  width?: string
  padding?: string
  margin?: string
  onClick?: (event: React.MouseEvent) => void
}

const Button = ({
  className = '',
  styleType = 'primary',
  onClick,
  children,
  height,
  width,
  disabled,
  padding,
  margin,
  ...rest
}: Props) => {
  const currentStyle = disabled ? 'disabled' : styleType

  const buttonStyle = {
    padding,
    margin,
    height,
    width,
  }

  return (
    <button
      className={`button  ${className} ${currentStyle}`}
      disabled={disabled}
      style={buttonStyle}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  )
}

export default Button

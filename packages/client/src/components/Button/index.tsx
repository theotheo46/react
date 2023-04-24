import React from 'react'
import './Button.pcss'

type StyleTypes = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'error' // TODO можно перенести в общий файл с типами

interface ButtonProps
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

const ButtonPallete = {
  primary: { main: '#FB923C', border: '#FB923C', color: '#FFF' },
  secondary: { main: 'transparent', border: '#FB923C', color: '#FB923C' },
  tertiary: { main: 'transparent', border: '#D4D4D8', color: '#A1A1AA' },
  disabled: { main: '#D9D9D9', border: '#D9D9D9', color: '#A1A1AA' },
  error: { main: '#8F0F2B', border: '#8F0F2B', color: '#FFF' }
}

const Button: React.FC<ButtonProps> = ({
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
}) => {
  const selectedStyle = disabled
    ? ButtonPallete.disabled
    : ButtonPallete[styleType]

  const buttonStyle = {
    backgroundColor: selectedStyle.main,
    borderColor: selectedStyle.border,
    color: selectedStyle.color,
    padding,
    margin,
    height,
    width
  }

  return (
    <button
      className={'button ' + className}
      disabled={disabled}
      style={buttonStyle}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  )
}

export default Button

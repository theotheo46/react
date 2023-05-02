import React from 'react'
import './Form.pcss'
import Input, { InputProps } from '../../components/Input'
import Button from '../Button'
import { NavLink } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { REGEX_ERRORS, REGULAR_EXPRESSON } from '../../utils/validate-data'
interface FormProps {
  title: string
  className: string
  inputs: InputProps[]
  buttonLabel: string
  onSubmit: SubmitHandler<Record<string, unknown>>
}

const Form: React.FC<FormProps> = ({
  title,
  className,
  inputs,
  buttonLabel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  })
  const onSubmit: SubmitHandler<Record<string, unknown>> = data => {
    console.log(JSON.stringify(data))
  }
  const navLink =
    title === 'Регистрация'
      ? {
          path: '/signin',
          title: 'Уже зарегистрированы? Войти',
        }
      : title === 'Войти в профиль'
      ? {
          path: '/signup',
          title: 'Ещё нет аккаунта? Зарегистрируйтесь',
        }
      : null

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`form ${className}`}>
      <h1 className="form-title">{title}</h1>
      {inputs.map((input, key) => (
        <Input
          key={key}
          {...input}
          isValid={errors[input.name] ? true : false}
          refs={register(input.name, {
            required: {
              value: input.required || false,
              message: 'Это поле обязательно для заполнения',
            },
            pattern: {
              value: input.regex || REGULAR_EXPRESSON.MESSAGE,
              message: input.errorText || REGEX_ERRORS.MESSAGE,
            },
          })}
        />
      ))}
      {navLink && <NavLink to={navLink.path}>{navLink.title}</NavLink>}
      <Button type="submit" disabled={!isValid} width="100%" height="48px">
        {buttonLabel}
      </Button>
    </form>
  )
}

export default Form

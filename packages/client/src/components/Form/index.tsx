import React, { useState } from 'react'
import './Form.pcss'
import Input, { InputProps } from '../../components/Input'
import Button from '../Button'
import YandexIcon from '../../assets/icons/icon-yandex.svg'
import { NavLink } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { REGEX_ERRORS, REGULAR_EXPRESSON } from '../../utils/validate-data'
import { getServiceId } from '../../store/slices/userSlice/userAsyncThunks'
import { useAppDispatch } from '../../store/hooks'
import Modal from '../Modal'
import ErrorInformer from '../ErrorInformer'
interface Props {
  title: string
  className: string
  inputs: InputProps[]
  buttonLabel: string
  onSubmit: SubmitHandler<Record<string, unknown>>
}

const Form = ({ title, className, inputs, buttonLabel, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  })
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const handleOAuth = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e?.preventDefault()
    let serviceId = ''
    const redirect_url =
      process.env.NODE_ENV === 'production'
        ? 'https://altai.ya-praktikum.tech'
        : 'http://localhost:3001'
    const res = await dispatch(getServiceId())
    if (getServiceId.fulfilled.match(res)) {
      serviceId = res.payload.service_id
      document.location = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirect_url}`
    } else {
      setError(res.payload || res.error.message || 'Error')
    }
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
          hasError={!!errors[input.name]}
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
      {(title === 'Регистрация' || title === 'Войти в профиль') && (
        <Button
          type="button"
          width="100%"
          height="48px"
          onClick={e => {
            handleOAuth(e)
          }}>
          {title} с помощью <img src={YandexIcon} alt="Яндекс" height="28px" />
        </Button>
      )}
      {error && (
        <Modal
          title="Не удалось войти в аккаунт через Яндекс"
          onClose={() => {
            setError('')
          }}>
          <ErrorInformer
            errorCode="401"
            errorText={error}
            errorStatus="Попробуйте войти в аккаунт позже."
          />
        </Modal>
      )}
    </form>
  )
}

export default Form

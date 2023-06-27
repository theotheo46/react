import { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import Modal from '../Modal'
import { ModalTypes } from '../../pages/Forum/ForumPage'
import { useForm } from 'react-hook-form'
import {
  REGEX_ERRORS,
  REGULAR_EXPRESSON,
  VALIDATE_FIELDS,
} from '../../utils/validate-data'

interface Props {
  title: string
  type?: ModalTypes
  onSubmit: (title: string) => void
  onClose: () => void
}

const ForumModal = ({ title, type, onSubmit, onClose }: Props) => {
  const [name, setName] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  })
  const Submit = async () => {
    try {
      await onSubmit(name)
      setName('')
      onClose()
    } catch (err) {
      throw new Error(`${err}`)
    }
  }
  return (
    <Modal title={title} onClose={() => onClose()}>
      <form onSubmit={handleSubmit(Submit)}>
        {type !== 'delete' && (
          <Input
            {...VALIDATE_FIELDS.forum[0]}
            onChange={e => setName(e.target.value)}
            hasError={!!errors['title']}
            refs={register('title', {
              required: {
                value: true,
                message: 'Это поле обязательно для заполнения',
              },
              pattern: {
                value: REGULAR_EXPRESSON.TITLE,
                message: REGEX_ERRORS.TITLE,
              },
            })}></Input>
        )}
        <Button
          type="submit"
          styleType="primary"
          disabled={!isValid}
          margin="42px 0px 0px">
          {type === 'create'
            ? 'Создать'
            : type === 'rename'
            ? 'Изменить'
            : type === 'delete'
            ? 'Удалить'
            : 'Отправить'}
        </Button>
      </form>
    </Modal>
  )
}
export default ForumModal

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
  const [isDirty, setIsDirty] = useState(false)
  const { register, handleSubmit } = useForm({
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

  const handleChange = (value: string) => {
    if (!isDirty) {
      setIsDirty(true)
    }
    setName(value)
  }

  return (
    <Modal title={title} onClose={() => onClose()}>
      <form onSubmit={handleSubmit(Submit)}>
        {type !== 'delete' && (
          <Input
            {...VALIDATE_FIELDS.forum[0]}
            onChange={e => handleChange(e.target.value)}
            hasError={isDirty && (name.length <= 0 || name.length > 40)}
            refs={register('title', {
              pattern: {
                value: REGULAR_EXPRESSON.TITLE,
                message: REGEX_ERRORS.TITLE,
              },
            })}></Input>
        )}
        <Button
          type="submit"
          styleType="primary"
          disabled={name.length <= 0 || name.length > 40}
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

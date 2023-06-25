import { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import Modal from '../Modal'
import { ModalTypes } from '../../pages/Forum/ForumPage'

interface Props {
  title: string
  type?: ModalTypes
  onSubmit: (e: React.FormEvent<HTMLFormElement>, title: string) => void
  onClose: () => void
}

const ForumModal = ({ title, type, onSubmit, onClose }: Props) => {
  const [name, setName] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await onSubmit(e, name)
      setName('')
      onClose()
    } catch (err) {
      throw new Error(`${err}`)
    }
  }
  return (
    <Modal title={title} onClose={() => onClose()}>
      <form onSubmit={e => handleSubmit(e)}>
        {type !== 'delete' && (
          <Input
            label="Заголовок"
            name="title"
            value={name}
            onChange={e => setName(e.target.value)}></Input>
        )}
        <Button type="submit" styleType="primary" margin="42px 0px 0px">
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

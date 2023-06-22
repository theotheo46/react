import Button from '../../components/Button'
import ForumSection from '../../components/ForumSection'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumPage.pcss'
import { useState } from 'react'
import ForumModal from '../../components/ForumModal'
import Modal from '../../components/Modal'
import ErrorInformer from '../../components/ErrorInformer'
import mockData from './mockData'
import { useAppSelector } from '../../store/hooks'
import { ModalProps, ModalTypes } from './ForumPage'
import { baseApi } from '../../api/baseApi'

const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string
  title: string
  name: string
  user: string
  timestamp: string
}

const ForumSectionPage = ({
  title,
  className,
  name,
  user,
  timestamp,
}: Props) => {
  const navigate = useNavigate()
  const { mockTopics } = mockData
  const { user: player } = useAppSelector(state => state.user)
  const [modal, setModal] = useState<ModalProps>({ isOpen: false, type: null })
  const [topicId, setTopicId] = useState('')
  const [topicTitle, setTopicTitle] = useState('')
  const [error, setError] = useState('')

  const handleNavigateToTopic = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault()
    console.log(`/forumtopic/${id}`)
    navigate(`/forumtopic`) // Нужно добавить переход по id /forumtopic/${id}
  }

  const handleOpenModal = (
    e: React.MouseEvent<Element, MouseEvent>,
    modalType: ModalTypes,
    id?: string,
    title?: string
  ) => {
    e.stopPropagation()
    if (id) setTopicId(id)
    if (title) setTopicTitle(title)
    setModal({ isOpen: true, type: modalType })
  }

  const handleModalClose = () => {
    setTopicId('')
    setTopicTitle('')
    setModal({ isOpen: false, type: null })
  }

  const handleModalSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    title: string
  ) => {
    e.preventDefault()
    if (modal.type === 'create') {
      await handleCreateTopic(title)
    }

    if (modal.type === 'delete') {
      await handleDeleteTopic(topicId)
    }
    if (modal.type === 'rename') {
      await handleRenameTopic(topicId, title)
    }
  }

  const handleCreateTopic = async (title: string) => {
    const data = {
      userId: player!.id,
      usernick: player?.display_name || player!.login,
      topicname: title,
      sectionId: '1',
    }
    try {
      const res = await baseApi('local').post('/addtopic', data)
      console.log('data', res.data)
    } catch (err) {
      setError(`${err}`)
    }
    console.log('data', title)
  }

  const handleRenameTopic = async (id: string, title: string) => {
    const data = {
      userId: player!.id,
      id: id,
      topicname: title,
    }
    try {
      const res = await baseApi('local').post('/updatetopic', data)
      console.log('data', res.data)
    } catch (err) {
      setError(`Ручка /updatetopic ещё не добавлена, ${err}`)
    } // Это ручка ещё не добавлена из бэка
    console.log('data', data)
  }

  const handleDeleteTopic = async (id: string) => {
    const data = {
      id: id,
    }
    try {
      const res = await baseApi('local').post('/deletetopic', data)
      console.log('data', res.data)
    } catch (err) {
      setError(`${err}`)
    }
    console.log('data', title)
  }

  return (
    <div className={`${className}-wrapper`}>
      <div className={`${className}-container`}>
        <div className={`${className}-header`}>
          <div className="header-left">{name}</div>
          <div className="header-right">
            <span>{`Автор: ${user}`}</span>
            <span>{timestamp}</span>
          </div>
        </div>
        <div className="header-button-container">
          <div className="button-container">
            <Button onClick={() => navigate(-1)} styleType="tertiary">
              <FaArrowLeft style={iconBackStyle} />
              Назад
            </Button>
            <Button
              styleType="primary"
              onClick={e => handleOpenModal(e, 'create')}>
              Создать новую тему
            </Button>
            <Button styleType="primary">Переименовать раздел</Button>
            {/* Необходимо передавать id текущей секции, чтобы её изменить или удалить*/}
            <Button styleType="error">Удалить раздел</Button>
          </div>
          <div className="header">{title}</div>
        </div>
        <div className="section-container">
          {mockTopics &&
            mockTopics.map(topic => (
              <ForumSection
                onClick={e => handleNavigateToTopic(e, topic.id)}
                onDelete={e =>
                  handleOpenModal(e, 'delete', topic.id, topic.name)
                }
                onRename={e =>
                  handleOpenModal(e, 'rename', topic.id, topic.name)
                }
                key={topic.id}
                id={topic.id}
                className="forum-section"
                name={topic.name}
                user={topic.user}
                userId={topic.userId}
                timestamp={topic.timestamp}
                childrenElements={topic.messages}
              />
            ))}
          {modal.isOpen && (
            <ForumModal
              title={
                modal.type === 'create'
                  ? `Создать тему для ${name}`
                  : modal.type === 'delete'
                  ? `Вы уверены, что хотите удалить тему "${topicTitle}"?`
                  : modal.type === 'rename'
                  ? `Введите новое название для темы "${topicTitle}"?`
                  : ''
              }
              type={modal.type}
              onClose={() => handleModalClose()}
              onSubmit={async (e, title) => await handleModalSubmit(e, title)}
            />
          )}
          {error && (
            <Modal
              title="Не удалось создать тему"
              onClose={() => {
                setError('')
              }}>
              <ErrorInformer
                errorCode=""
                errorText={error}
                errorStatus="Попробуйте создать тему позже."
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForumSectionPage

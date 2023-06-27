import Button from '../../components/Button'
import ForumSection from '../../components/ForumSection'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumPage.pcss'
import { useEffect, useState } from 'react'
import ForumModal from '../../components/ForumModal'
import Modal from '../../components/Modal'
import ErrorInformer from '../../components/ErrorInformer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ModalProps, ModalTypes } from './ForumPage'
import {
  addTopic,
  deleteSection,
  deleteTopic,
  getAllSections,
  getAllTopics,
} from '../../store/slices/forumSlice/forumAsyncThunks'
import {
  FORUM_INIT,
  getSelectSectionFromLS,
  setSelectSectionToLS,
  setSelectTopicToLS,
} from '../../store/slices/forumSlice'

const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

const ForumSectionPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const param = useParams<'id'>()
  const sectionParam = {
    sectionId: Number(param.id),
  }
  const { user } = useAppSelector(state => state.user)
  const { selectSection, sections, topics } = useAppSelector(
    state => state.forum
  )
  const [modal, setModal] = useState<ModalProps>({ isOpen: false, type: null })
  const [topicId, setTopicId] = useState(-1)
  const [topicTitle, setTopicTitle] = useState('')
  const [error, setError] = useState<Error | null>(null)
  const [createdAt, setCreatedAt] = useState('')

  const handleNavigateToTopic = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault()
    dispatch(setSelectTopicToLS(id))
    navigate(`/forumtopic/${id}`)
  }

  const handleOpenModal = (
    e: React.MouseEvent<Element, MouseEvent>,
    modalType: ModalTypes,
    id?: number,
    title?: string
  ) => {
    e.stopPropagation()
    if (id) setTopicId(id)
    if (title) setTopicTitle(title)
    setModal({ isOpen: true, type: modalType })
  }

  const handleModalClose = () => {
    setTopicId(-1)
    setTopicTitle('')
    setModal({ isOpen: false, type: null })
  }

  const handleModalSubmit = async (title: string) => {
    switch (modal.type) {
      case 'create':
        await handleCreateTopic(title)
        break
      case 'delete':
        await handleDeleteTopic(topicId)
        break
      case 'rename':
        await handleRenameTopic(topicId, title)
        break
    }
  }

  const handleDeleteSection = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault()
    const data = {
      id: selectSection!.id,
    }
    try {
      await dispatch(deleteSection(data))
      await dispatch(getAllSections())
      navigate('/forum')
    } catch (error) {
      setError(error as Error)
    }
  }

  const handleCreateTopic = async (title: string) => {
    const data = {
      userId: user!.id,
      usernick: user?.display_name || user!.login,
      topicname: title,
      sectionId: sectionParam.sectionId,
    }
    try {
      await dispatch(addTopic(data))
      await fetchTopics()
    } catch (err) {
      setError(err as Error)
    }
  }

  const handleRenameTopic = async (id: number, title: string) => {
    setError({
      message: 'Ручка /renametopic ещё не добавлена',
      name: 'Скоро поправим!',
    })
  }

  const handleDeleteTopic = async (id: number) => {
    const data = {
      id: id,
    }
    try {
      await dispatch(deleteTopic(data))
      await fetchTopics()
    } catch (err) {
      setError(err as Error)
    }
  }

  const fetchTopics = async () => {
    try {
      await dispatch(getAllTopics(sectionParam))
    } catch (err) {
      setError(err as Error)
    }
  }
  const fetchSections = async () => {
    try {
      await dispatch(getAllSections())
    } catch (err) {
      setError(err as Error)
    }
  }
  const setSelectSection = async () => {
    try {
      await dispatch(setSelectSectionToLS(sectionParam.sectionId))
    } catch (err) {
      setError(err as Error)
    }
  }

  useEffect(() => {
    if (selectSection) {
      setSelectSection()
      setCreatedAt(new Date(selectSection?.createdAt || '').toLocaleString())
    } else if (localStorage.getItem(FORUM_INIT.selectSection)) {
      getSelectSectionFromLS()
      fetchSections()
    } else {
      fetchSections()
      setSelectSection()
    }
    fetchTopics()
  }, [])
  useEffect(() => {
    setSelectSection()
  }, [sections])
  useEffect(() => {
    setCreatedAt(new Date(selectSection?.createdAt || '').toLocaleString())
  }, [selectSection])

  return (
    <div className="forum-page-wrapper">
      <div className="forum-page-container">
        <div className="forum-page-header">
          <div className="header-left">{selectSection?.sectionname}</div>
          <div className="header-right">
            <span>{`Автор: ${selectSection?.usernick}`}</span>
            <span>{createdAt}</span>
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
            <Button styleType="primary" disabled>
              Переименовать раздел
            </Button>
            <Button styleType="error" onClick={e => handleDeleteSection(e)}>
              Удалить раздел
            </Button>
          </div>
          <div className="header">Темы</div>
        </div>
        <div className="section-container">
          {topics &&
            topics.map(topic => (
              <ForumSection
                onClick={e => handleNavigateToTopic(e, topic.id)}
                onDelete={e =>
                  handleOpenModal(e, 'delete', topic.id, topic.topicname)
                }
                onRename={e =>
                  handleOpenModal(e, 'rename', topic.id, topic.topicname)
                }
                key={topic.id}
                className="forum-section"
                name={topic.topicname}
                user={topic.usernick}
                userId={topic.userId}
                timestamp={topic.createdAt}
                childrenElements={topic.messages?.map(
                  message => message.messagetextcut
                )}
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
              onSubmit={async title => await handleModalSubmit(title)}
            />
          )}
          {error && (
            <Modal
              title="Не удалось создать тему"
              onClose={() => {
                setError(null)
              }}>
              <ErrorInformer
                errorCode={error.name}
                errorText={error.message}
                errorStatus={error.stack || 'Попробуйте позже.'}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForumSectionPage

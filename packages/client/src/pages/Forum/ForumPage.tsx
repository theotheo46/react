import Button from '../../components/Button'
import ForumSection from '../../components/ForumSection'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumPage.pcss'
import { useEffect, useState } from 'react'
import ForumModal from '../../components/ForumModal'
import Modal from '../../components/Modal'
import ErrorInformer from '../../components/ErrorInformer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addSection,
  deleteSection,
  getAllSections,
} from '../../store/slices/forumSlice/forumAsyncThunks'
import { setSelectSectionToLS } from '../../store/slices/forumSlice'

export type ModalTypes = 'create' | 'delete' | 'rename' | null
export interface ModalProps {
  isOpen: boolean
  type: ModalTypes
}

const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

const ForumPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector(state => state.user)
  const { sections } = useAppSelector(state => state.forum)
  const [modal, setModal] = useState<ModalProps>({ isOpen: false, type: null })
  const [sectionId, setSectionId] = useState(-1)
  const [error, setError] = useState<Error | null>(null)

  const handleNavigateToSection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault()
    dispatch(setSelectSectionToLS(id))
    navigate(`/forumsection/${id}`)
  }
  const handleOpenModal = (
    e: React.MouseEvent<Element, MouseEvent>,
    modalType: ModalTypes,
    id?: number
  ) => {
    e.stopPropagation()
    if (id) setSectionId(id)
    setModal({ isOpen: true, type: modalType })
  }

  const handleModalClose = () => {
    setSectionId(-1)
    setModal({ isOpen: false, type: null })
  }

  const handleModalSubmit = async (title: string) => {
    switch (modal.type) {
      case 'create':
        await handleCreateSection(title)
        break
      case 'delete':
        await handleDeleteSection(sectionId)
        break
      case 'rename':
        await handleRenameSection(sectionId, title)
        break
    }
  }

  const handleCreateSection = async (title: string) => {
    const data = {
      userId: user!.id,
      usernick: user?.display_name || user!.login,
      sectionname: title,
    }
    try {
      await dispatch(addSection(data))
      fetchSections()
    } catch (err) {
      setError(err as Error)
    }
  }

  const handleRenameSection = async (id: number, title: string) => {
    setError({
      message: 'Ручка /renamesection ещё не добавлена',
      name: 'Скоро поправим!',
    })
  }

  const handleDeleteSection = async (id: number) => {
    const data = {
      id: id,
    }
    try {
      await dispatch(deleteSection(data))
      fetchSections()
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

  useEffect(() => {
    fetchSections()
  }, [])

  return (
    <div className="forum-page-wrapper">
      <div className="forum-page-container">
        <div className="header-button-container">
          <div className="button-container">
            <Button onClick={() => navigate(-1)} styleType="tertiary">
              <FaArrowLeft style={iconBackStyle} />
              Назад
            </Button>
            <Button
              styleType="primary"
              onClick={e => handleOpenModal(e, 'create')}>
              Создать новый раздел
            </Button>
          </div>
          <div className="header forum-page-title">Форум игры</div>
        </div>
        <div className="section-container">
          {sections ? (
            sections.map(section => (
              <ForumSection
                onClick={e => handleNavigateToSection(e, section.id)}
                onDelete={e => handleOpenModal(e, 'delete', section.id)}
                onRename={e => handleOpenModal(e, 'rename', section.id)}
                key={section.id}
                className="forum-section"
                name={section.sectionname}
                user={section.usernick}
                userId={section.userId}
                timestamp={section.createdAt}
                childrenElements={section.topics?.map(topic => topic.topicname)}
              />
            ))
          ) : (
            <h3>Создайте первую секцию!</h3>
          )}

          {modal.isOpen && (
            <ForumModal
              title={
                modal.type === 'create'
                  ? 'Создать новый раздел'
                  : modal.type === 'delete'
                  ? 'Вы уверены, что хотите удалить раздел?'
                  : modal.type === 'rename'
                  ? 'Введите новое название для раздела'
                  : ''
              }
              type={modal.type}
              onClose={() => handleModalClose()}
              onSubmit={async title => await handleModalSubmit(title)}
            />
          )}
          {error && (
            <Modal
              title="Ошибка при работе с разделом"
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

export default ForumPage

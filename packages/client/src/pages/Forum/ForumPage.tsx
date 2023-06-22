import Button from '../../components/Button'
import ForumSection from '../../components/ForumSection'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumPage.pcss'
import { useState } from 'react'
import ForumModal from '../../components/ForumModal'
import Modal from '../../components/Modal'
import ErrorInformer from '../../components/ErrorInformer'
import { useAppSelector } from '../../store/hooks'
import mockData from './mockData'
import { baseApi } from '../../api/baseApi'

export type ModalTypes = 'create' | 'delete' | 'rename' | null
export interface ModalProps {
  isOpen: boolean
  type: ModalTypes
}
interface Props
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string
  title: string
}

const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

const ForumPage = ({ title, className }: Props) => {
  const navigate = useNavigate()
  const { mockSections } = mockData
  const { user } = useAppSelector(state => state.user)
  const [modal, setModal] = useState<ModalProps>({ isOpen: false, type: null })
  const [sectionId, setSectionId] = useState('')
  const [error, setError] = useState('')

  const handleNavigateToSection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault()
    console.log(`/forumsection/${id}`)
    navigate(`/forumsection`) // Нужно добавить переход по id /forumsection/${id}
  }
  const handleOpenModal = (
    e: React.MouseEvent<Element, MouseEvent>,
    modalType: ModalTypes,
    id?: string
  ) => {
    e.stopPropagation()
    if (id) setSectionId(id)
    setModal({ isOpen: true, type: modalType })
  }

  const handleModalClose = () => {
    setSectionId('')
    setModal({ isOpen: false, type: null })
  }

  const handleModalSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    title: string
  ) => {
    e.preventDefault()
    if (modal.type === 'create') {
      await handleCreateSection(title)
    }

    if (modal.type === 'delete') {
      await handleDeleteSection(sectionId)
    }
    if (modal.type === 'rename') {
      await handleRenameSection(sectionId, title)
    }
  }

  const handleCreateSection = async (title: string) => {
    const data = {
      userId: user!.id,
      usernick: user?.display_name || user!.login,
      sectionname: title,
    }
    try {
      const res = await baseApi('local').post('/addsection', data)
      console.log('data', res.data)
    } catch (err) {
      setError(`${err}`)
    }
    console.log('data', title)
  }

  const handleRenameSection = async (id: string, title: string) => {
    const data = {
      userId: user!.id,
      id: id,
      sectionname: title,
    }
    try {
      const res = await baseApi('local').post('/updatesection', data)
      console.log('data', res.data)
    } catch (err) {
      setError(`Ручка /updatesection ещё не добавлена, ${err}`)
    } // Это ручка ещё не добавлена из бэка
    console.log('data', data)
  }

  const handleDeleteSection = async (id: string) => {
    const data = {
      id: id,
    }
    try {
      const res = await baseApi('local').post('/deletesection', data)
      console.log('data', res.data)
    } catch (err) {
      setError(`${err}`)
    }
    console.log('data', title)
  }

  return (
    <div className={`${className}-wrapper`}>
      <div className={`${className}-container`}>
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
          <div className="header forum-page-title">{title}</div>
        </div>
        <div className="section-container">
          {mockSections &&
            mockSections.map(section => (
              <ForumSection
                onClick={e => handleNavigateToSection(e, section.id)}
                onDelete={e => handleOpenModal(e, 'delete', section.id)}
                onRename={e => handleOpenModal(e, 'rename', section.id)}
                key={section.id}
                id={section.id}
                className="forum-section"
                name={section.name}
                user={section.user}
                userId={section.userId}
                timestamp={section.timestamp}
                childrenElements={section.topics}
              />
            ))}

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
              onSubmit={async (e, title) => await handleModalSubmit(e, title)}
            />
          )}
          {error && (
            <Modal
              title="Не удалось создать раздел"
              onClose={() => {
                setError('')
              }}>
              <ErrorInformer
                errorCode=""
                errorText={error}
                errorStatus="Попробуйте создать раздел позже."
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForumPage

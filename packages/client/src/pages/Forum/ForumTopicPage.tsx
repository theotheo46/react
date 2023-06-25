import Button from '../../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumTopicPage.pcss'
import ForumChatBlock from '../../components/ForumChatBlock'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Modal from '../../components/Modal'
import ErrorInformer from '../../components/ErrorInformer'
import {
  getSelectTopicFromLS,
  setSelectTopicToLS,
} from '../../store/slices/forumSlice'
import {
  deleteTopic,
  getAllMessages,
  getAllSections,
} from '../../store/slices/forumSlice/forumAsyncThunks'

const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

const ForumTopicPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const param = useParams<'id'>()
  const topicParam = {
    topicId: Number(param.id),
  }
  const [error, setError] = useState<Error | null>(null)
  const [createdAt, setCreatedAt] = useState('')
  const { selectTopic, topics, sections } = useAppSelector(state => state.forum)

  const handleDeleteTopic = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault()
    const data = {
      id: selectTopic!.id,
    }
    const sectionId = selectTopic!.sectionId
    try {
      await dispatch(deleteTopic(data))
      navigate(`/forumsection/${sectionId}`)
    } catch (error) {
      setError(error as Error)
    }
  }

  const fetchMessages = async () => {
    try {
      await dispatch(getAllMessages(topicParam))
    } catch (error) {
      setError(error as Error)
    }
  }

  const setSelectTopic = async () => {
    try {
      await dispatch(setSelectTopicToLS(topicParam.topicId))
    } catch (err) {
      setError(err as Error)
    }
  }

  useEffect(() => {
    if (!selectTopic) {
      dispatch(getSelectTopicFromLS())
      dispatch(getAllSections())
    }
    fetchMessages()
    setSelectTopic()
    setCreatedAt(new Date(selectTopic?.createdAt || '').toLocaleString())
  }, [])
  useEffect(() => {
    setSelectTopic()
  }, [sections])
  useEffect(() => {
    setSelectTopic()
  }, [topics])
  useEffect(() => {
    setCreatedAt(new Date(selectTopic?.createdAt || '').toLocaleString())
  }, [selectTopic])

  return (
    <div className="forum-topic-page">
      <div className={`forum-topic-page-wrapper`}>
        <div className={`forum-topic-page-container`}>
          <div className={`forum-topic-page-header`}>
            <div className="header-left">{selectTopic?.topicname}</div>
            <div className="header-right">
              <span>{`Автор: ${selectTopic?.usernick}`}</span>
              <span>{createdAt}</span>
            </div>
          </div>
          <div className="header-button-container">
            <div className="button-container">
              <Button onClick={() => navigate(-1)} styleType="tertiary">
                <FaArrowLeft style={iconBackStyle} />
                Назад
              </Button>
              <Button styleType="primary" disabled>
                Переименовать тему
              </Button>
              <Button styleType="error" onClick={e => handleDeleteTopic(e)}>
                Удалить тему
              </Button>
            </div>
            <div className="header">Сообщения</div>
          </div>
          <div className="topic-container">
            <ForumChatBlock />
          </div>
          {error && (
            <Modal
              title="Ошибка при работе с Сообщениями"
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

export default ForumTopicPage

import Button from '../../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumTopicPage.pcss'
import ForumChatBlock from '../../components/ForumChatBlock'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Modal from '../../components/Modal'
import ErrorInformer from '../../components/ErrorInformer'
import { setSelectTopicToLS } from '../../store/slices/forumSlice'
import {
  deleteTopic,
  getAllMessages,
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
  const { selectTopic } = useAppSelector(state => state.forum)

  const handleDeleteTopic = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault()
    const data = {
      id: selectTopic!.id,
    }
    const sectionId = selectTopic!.sectionId
    try {
      const res = await dispatch(deleteTopic(data))
      console.log(`section ${res.payload} deleted`)
      navigate(`/forumsection/${sectionId}`)
    } catch (error) {
      setError(error as Error)
    }
  }

  const fetchMessages = async () => {
    try {
      await dispatch(getAllMessages(topicParam))
      console.log('fetching sections success!')
    } catch (error) {
      setError(error as Error)
    }
  }

  useEffect(() => {
    dispatch(setSelectTopicToLS(topicParam.topicId))
    fetchMessages()
    setCreatedAt(new Date(selectTopic!.createdAt).toLocaleString())
  }, [])

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

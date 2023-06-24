import Input from '../Input'
import Button from '../Button'
import { FaPaperPlane, FaRegGrinWink } from 'react-icons/fa'
import './ForumChatBlock.pcss'
import ForumSection from '../ForumSection'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addMessage,
  addReply,
  deleteMessage,
  getAllMessages,
  updateMessage,
} from '../../store/slices/forumSlice/forumAsyncThunks'
import Modal from '../Modal'
import ErrorInformer from '../ErrorInformer'
import {
  RequestAddMessage,
  RequestAddReply,
  RequestUpdateMessage,
  WritingMode,
} from '../../store/slices/forumSlice/types'

const iconSubmitStyle = {
  fill: 'var(--color-white)',
  fontSize: '1.25rem',
}
const iconAttachStyle = {
  fill: 'var(--color-orange)',
  fontSize: '1.25rem',
}

const ForumChatBlock = () => {
  const dispatch = useAppDispatch()
  const param = useParams<'id'>()
  const topicParam = {
    topicId: Number(param.id),
  }
  const { messages } = useAppSelector(state => state.forum)
  const { user } = useAppSelector(state => state.user)
  const [error, setError] = useState<Error | null>(null)
  const [writingMode, setWritingMode] = useState<WritingMode>('new')
  const [selectMessageId, setSelectMessageId] = useState(-1)
  const [message, setMessage] = useState('')

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (writingMode === 'new') {
        const data: RequestAddMessage = {
          messagetext: message,
          topicId: topicParam.topicId,
          userId: user!.id,
          usernick: user!.display_name || user!.login,
        }
        const res = await dispatch(addMessage(data))
        console.log(`message ${res.payload} send success`)
      } else if (writingMode === 'reply') {
        const data: RequestAddReply = {
          messagetext: message,
          messageId: selectMessageId,
          userId: user!.id,
          usernick: user!.display_name || user!.login,
        }
        const res = await dispatch(addReply(data))
        console.log(`reply ${res.payload} send success`)
      } else if (writingMode === 'update') {
        const data: RequestUpdateMessage = {
          messagetext: message,
          id: selectMessageId,
          userId: user!.id,
        }
        const res = await dispatch(updateMessage(data))
        console.log(`message ${res.payload} changed success`)
      }
      await dispatch(getAllMessages(topicParam))
      setMessage('')
      setWritingMode('new')
      setSelectMessageId(-1)
    } catch (error) {
      setError(error as Error)
    }
  }
  const handleMessageDelete = async (
    e: React.MouseEvent<Element, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation()
    try {
      const res = await dispatch(deleteMessage({ id }))
      console.log(`message with id:${res.payload} was deleted`)
      await dispatch(getAllMessages(topicParam))
    } catch (error) {
      setError(error as Error)
    }
    setWritingMode('new')
  }
  const handleMessageChange = (
    e: React.MouseEvent<Element, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation()
    setWritingMode('update')
    setSelectMessageId(id)
    const oldMessageIndex = messages.findIndex(message => message.id === id)
    setMessage(messages[oldMessageIndex].messagetext)
  }
  const handleAddReply = (
    e: React.MouseEvent<Element, MouseEvent>,
    id: number
  ) => {
    e.preventDefault()
    if (writingMode === 'reply' && selectMessageId === id) {
      setSelectMessageId(-1)
      return setWritingMode('new')
    }
    setMessage('')
    setWritingMode('reply')
    setSelectMessageId(id)
  }
  return (
    <>
      <div className="messages-panel">
        {/* {isPending && <Loader />} */}
        {messages?.map((message, idx) => (
          <div key={idx}>
            <div className="message">
              <ForumSection
                name={''}
                key={message.id}
                user={message.usernick}
                onClick={e => {
                  handleAddReply(e, message.id)
                }}
                userId={message.userId}
                timestamp={message.createdAt}
                onRename={e => handleMessageChange(e, message.id)}
                onDelete={e => {
                  handleMessageDelete(e, message.id)
                }}
                childrenElements={[`${message.messagetext}`]}
                className="forum-section"
                style={
                  selectMessageId === message.id
                    ? {
                        margin: 0,
                        width: '100%',
                        backgroundColor: 'var(--color-bg-gray)',
                      }
                    : { margin: 0, width: '100%' }
                }
              />
            </div>
            {message.parentReply &&
              message.parentReply.messages.map((reply, idx) => (
                <div key={idx} className="message reply">
                  <ForumSection
                    name={`⮬`}
                    key={reply.id}
                    user={reply.usernick}
                    onClick={() => {
                      return
                    }}
                    userId={reply.userId}
                    timestamp={reply.createdAt}
                    onRename={e => handleMessageChange(e, reply.id)}
                    onDelete={e => {
                      handleMessageDelete(e, reply.id)
                    }}
                    childrenElements={[`${reply.messagetext}`]}
                    className="forum-section"
                    style={{ margin: 0, width: '100%' }}
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
      <form onSubmit={e => sendMessage(e)} className="input-conainer">
        <div className="input-controllers">
          <Input
            className="message-input"
            label={
              writingMode === 'new'
                ? 'Введите новое сообщение'
                : writingMode === 'reply'
                ? `Напишите ответ для ${
                    messages.find(message => message.id === selectMessageId)
                      ?.usernick
                  }`
                : writingMode === 'update'
                ? 'Измените сообщение'
                : ''
            }
            name="message"
            height={'48px'}
            width={'100%'}
            type="textarea"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button
            className="attach-button"
            type="button"
            styleType="tertiary"
            width="40px"
            height="40px"
            padding="0">
            <FaRegGrinWink style={iconAttachStyle} />
          </Button>
        </div>
        <Button
          className="send-button"
          type="submit"
          styleType="primary"
          width="48px"
          height="48px"
          padding="0">
          <FaPaperPlane style={iconSubmitStyle} />
        </Button>
      </form>
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
    </>
  )
}
export default ForumChatBlock

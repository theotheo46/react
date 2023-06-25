import './ForumChatBlock.pcss'
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
import MessagesPanel from './MessagesPanel'
import InputContainer from './InputContainer'

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
      let data
      switch (writingMode) {
        case 'new':
          data = {
            messagetext: message,
            topicId: topicParam.topicId,
            userId: user!.id,
            usernick: user!.display_name || user!.login,
          } as RequestAddMessage
          await dispatch(addMessage(data))
          break
        case 'reply':
          data = {
            messagetext: message,
            messageId: selectMessageId,
            userId: user!.id,
            usernick: user!.display_name || user!.login,
          } as RequestAddReply
          await dispatch(addReply(data))
          break
        case 'update':
          data = {
            messagetext: message,
            id: selectMessageId,
            userId: user!.id,
          } as RequestUpdateMessage
          await dispatch(updateMessage(data))
          break
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
      await dispatch(deleteMessage({ id }))
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
    const oldMessageIndex = messages.findIndex(message => message.id === id)
    if (oldMessageIndex === -1) {
      // Тогда ищем в списках с реплаями
      const messageIndexWithOldReply = messages.findIndex(message =>
        message.parentReply?.messages.find(message => message.id === id)
      )
      const oldReplyIndex = messages[
        messageIndexWithOldReply
      ].parentReply!.messages.findIndex(message => message.id === id)
      setMessage(
        messages[messageIndexWithOldReply].parentReply!.messages[oldReplyIndex]
          .messagetext
      )
    } else {
      setMessage(messages[oldMessageIndex].messagetext)
    }
    setSelectMessageId(id)
  }

  const handleAddReply = (
    e: React.MouseEvent<Element, MouseEvent>,
    id: number
  ) => {
    e.preventDefault()
    if (writingMode === 'reply' && selectMessageId === id) {
      setSelectMessageId(-1)
      return setWritingMode('new')
    } else {
      const isMessage = messages.some(message => message.id === id)
      if (isMessage) {
        setMessage('')
        setWritingMode('reply')
      } else {
        setWritingMode('new')
      }
      setSelectMessageId(id)
    }
  }

  const setInputLabel = () => {
    switch (writingMode) {
      case 'reply':
        return `Напишите ответ для ${
          messages.find(message => message.id === selectMessageId)?.usernick
        }`
      case 'update':
        return 'Измените сообщение'
      default:
        return 'Введите новое сообщение'
    }
  }

  return (
    <>
      <MessagesPanel
        messages={messages}
        selectMessageId={selectMessageId}
        handleAddReply={handleAddReply}
        handleMessageChange={handleMessageChange}
        handleMessageDelete={handleMessageDelete}
      />
      <InputContainer
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        setInputLabel={setInputLabel}
      />
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

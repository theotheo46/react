import Input from '../Input'
import Button from '../Button'
import { FaLevelUpAlt, FaPaperPlane, FaRegGrinWink } from 'react-icons/fa'
import './ForumChatBlock.pcss'
import ForumSection from '../ForumSection'

export interface IForumMessages {
  //TODO rewrite
  id: number
  topicId: number | null
  replyID: number | null
  userId: number
  usernick: string
  messagetext: string
  createdAt: string
  updatedAt: string
  parentReply?: IReply
}
interface IReply {
  id: number
  parentMessageID: number
  createdAt: string
  updatedAt: string
  messages: IForumMessages[]
}

interface Props {
  messages: IForumMessages[]
}

const iconSubmitStyle = {
  fill: 'var(--color-white)',
  fontSize: '1.25rem',
}
const iconAttachStyle = {
  fill: 'var(--color-orange)',
  fontSize: '1.25rem',
}

const ForumChatBlock = ({ messages }: Props) => {
  const handleMessageDelete = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    return
  }
  const handleMessageChange = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    return
  }
  return (
    // <div className="chat-block">
    <>
      <div className="messages-panel">
        {messages &&
          messages.map(message => (
            <>
              <div className="message">
                <ForumSection
                  name={''}
                  key={message.id}
                  user={message.usernick}
                  onClick={() => {
                    return
                  }}
                  userId={message.userId}
                  timestamp={message.createdAt}
                  onRename={e => handleMessageChange(e)}
                  onDelete={e => {
                    handleMessageDelete(e)
                  }}
                  childrenElements={[`${message.messagetext}`]}
                  className="forum-section"
                  style={{ margin: 0, width: '100%' }}
                />
              </div>

              {message.parentReply &&
                message.parentReply.messages.map(reply => (
                  <div className="message reply">
                    <ForumSection
                      name={`⮬`}
                      key={reply.id}
                      user={reply.usernick}
                      onClick={() => {
                        return
                      }}
                      userId={reply.userId}
                      timestamp={reply.createdAt}
                      onRename={e => handleMessageChange(e)}
                      onDelete={e => {
                        handleMessageDelete(e)
                      }}
                      childrenElements={[`${reply.messagetext}`]}
                      className="forum-section"
                      style={{ margin: 0, width: '100%' }}
                    />
                  </div>
                ))}
            </>
          ))}
      </div>
      <div className="input-conainer">
        <div className="input-controllers">
          <Input
            className="message-input"
            label="Введите новое сообщение"
            name="message"
            height={'48px'}
            width={'100%'}
            type="textarea"
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
      </div>
      {/* </div> */}
    </>
  )
}
export default ForumChatBlock

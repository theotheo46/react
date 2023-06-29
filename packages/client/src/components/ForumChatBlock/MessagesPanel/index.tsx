import { IForumMessage } from '../../../store/slices/forumSlice/types'
import ForumSection from '../../ForumSection'

interface Props {
  messages: IForumMessage[]
  selectMessageId: number
  handleAddReply: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    messageId: number
  ) => void
  handleMessageChange: (
    e: React.MouseEvent<Element, MouseEvent>,
    messageId: number
  ) => void
  handleMessageDelete: (
    e: React.MouseEvent<Element, MouseEvent>,
    messageId: number
  ) => void
}

const MessagesPanel = ({
  messages,
  selectMessageId,
  handleAddReply,
  handleMessageChange,
  handleMessageDelete,
}: Props) => {
  return (
    <div className="messages-panel">
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
                  onClick={e => {
                    handleAddReply(e, reply.id)
                  }}
                  userId={reply.userId}
                  timestamp={reply.createdAt}
                  onRename={e => handleMessageChange(e, reply.id)}
                  onDelete={e => {
                    handleMessageDelete(e, reply.id)
                  }}
                  childrenElements={[`${reply.messagetext}`]}
                  className="forum-section"
                  style={
                    selectMessageId === reply.id
                      ? {
                          margin: 0,
                          width: '100%',
                          backgroundColor: 'var(--color-bg-gray)',
                        }
                      : { margin: 0, width: '100%' }
                  }
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}

export default MessagesPanel

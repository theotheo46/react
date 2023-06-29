import { FaPaperPlane, FaRegGrinWink } from 'react-icons/fa'
import Button from '../../Button'
import Input from '../../Input'
import { useState } from 'react'
import EmojiContainer from '../EmojiContainer'

interface Props {
  message: string
  setInputLabel: () => string
  setMessage: (value: React.SetStateAction<string>) => void
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const iconSubmitStyle = {
  fill: 'var(--color-white)',
  fontSize: '1.25rem',
}
const iconAttachStyle = {
  fill: 'var(--color-orange)',
  fontSize: '1.25rem',
}

const InputContainer = ({
  message,
  setInputLabel,
  setMessage,
  sendMessage,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenEmoji = () => {
    setIsOpen(!isOpen)
  }
  const handleAddEmoji = (emoji: string) => {
    setMessage(message => `${message}${emoji}`)
  }

  return (
    <form onSubmit={e => sendMessage(e)} className="input-conainer">
      <div className="input-controllers">
        <Input
          className="message-input"
          label={setInputLabel()}
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
          padding="0"
          onClick={handleOpenEmoji}>
          <FaRegGrinWink style={iconAttachStyle} />
        </Button>
        <EmojiContainer
          isActive={isOpen}
          addEmoji={emoji => handleAddEmoji(emoji)}
        />
      </div>
      <Button
        className="send-button"
        type="submit"
        styleType="primary"
        width="48px"
        height="48px"
        disabled={message.length === 0}
        padding="0">
        <FaPaperPlane style={iconSubmitStyle} />
      </Button>
    </form>
  )
}

export default InputContainer

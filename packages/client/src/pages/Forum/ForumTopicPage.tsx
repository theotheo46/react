import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumTopicPage.pcss'

const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string
  title: string
  name: string
  user: string
  timestamp: string
}

const ForumTopicPage = ({ title, className, name, user, timestamp }: Props) => {
  const navigate = useNavigate()
  return (
    <div className={className}>
      <div className={`${className}-header`}>
        <div className="header-left">{name}</div>
        <div className="header-right">
          <span>{`Автор: ${user}`}</span>
          <span>{timestamp}</span>
        </div>
      </div>
      <div className="header-button-container">
        <div className="header">{title}</div>
        <div className="button-container">
          <Button onClick={() => navigate(-1)} styleType="tertiary">
            <FaArrowLeft style={iconBackStyle} />
            Назад
          </Button>
          <Button styleType="primary">Переименовать тему</Button>
          <Button styleType="primary">Удалить тему</Button>
        </div>
      </div>
      <div className="topic-container">
        <div className="upper-pane"></div>
        <p className="message-title">Новое сообщение</p>
        <div className="lower-pane"></div>
      </div>
    </div>
  )
}

export default ForumTopicPage

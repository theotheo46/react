import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumTopicPage.pcss'
import ForumChatBlock from '../../components/ForumChatBlock'
import mockData from './mockData'

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
  const { mockMessages } = mockData
  return (
    <div className={className}>
      <div className={`${className}-wrapper`}>
        <div className={`${className}-container`}>
          <div className={`${className}-header`}>
            <div className="header-left">{name}</div>
            <div className="header-right">
              <span>{`Автор: ${user}`}</span>
              <span>{timestamp}</span>
            </div>
          </div>
          <div className="header-button-container">
            <div className="button-container">
              <Button onClick={() => navigate(-1)} styleType="tertiary">
                <FaArrowLeft style={iconBackStyle} />
                Назад
              </Button>
              <Button styleType="primary">Переименовать тему</Button>
              <Button styleType="error">Удалить тему</Button>
            </div>
            <div className="header">{title}</div>
          </div>
          <div className="topic-container">
            <ForumChatBlock messages={mockMessages} />
          </div>
          {/* <img className={`${className}-wave`} src={wave} alt="wave" /> */}
        </div>
      </div>
    </div>
  )
}

export default ForumTopicPage

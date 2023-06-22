import Button from '../../components/Button'
import ForumSection from '../../components/ForumSection'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumPage.pcss'
import wave from '../../assets/images/wave_v.svg'

const messages: string[] = [
  'Сообщение',
  'Сообщение2',
  'Сообщение3',
  'Сообщение4',
  'Сообщение5',
  'Сообщение6',
  'Сообщение7',
  'Сообщение8',
  'Сообщение9',
  'Сообщение0',
  'Сообщение1',
  'Сообщение2',
  'Сообщение3',
  'Сообщение4',
  'Сообщение5',
  'Сообщение6',
  'Сообщение7',
  'Сообщение8',
  'Сообщение9',
  'Сообщение20',
  'Сообщение21',
  'Сообщение22',
  'Сообщение23',
  'Сообщение24',
  'Сообщение25',
  'Сообщение26',
  'Сообщение27',
  'Сообщение28',
  'Сообщение29',
  'Сообщение30',
  'Сообщение31',
  'Сообщение32',
  'Сообщение33',
  'Сообщение34',
  'Сообщение35',
  'Сообщение36',
  'Сообщение37',
  'Сообщение38',
  'Сообщение39',
  'Сообщение40',
  'Сообщение41',
  'Сообщение42',
  'Сообщение43',
  'Сообщение44',
  'Сообщение45',
  'Сообщение46',
  'Сообщение47',
  'Сообщение48',
  'Сообщение49',
  'Сообщение50',
  'Сообщение51',
  'Сообщение52',
  'Сообщение53',
  'Сообщение54',
]

const messages1: string[] = [
  'Сообщение',
  'Сообщение2',
  'Сообщение3',
  'Сообщение4',
  'Сообщение5',
  'Сообщение6',
  'Сообщение7',
  'Сообщение8',
]

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

const ForumSectionPage = ({
  title,
  className,
  name,
  user,
  timestamp,
}: Props) => {
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
          <Button styleType="primary">Создать тему</Button>
          <Button styleType="primary">Переименовать раздел</Button>
          <Button styleType="primary">Удалить раздел</Button>
        </div>
      </div>
      <div className="section-container">
        <ForumSection
          className="forum-section"
          name="Тема1"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={messages}
        />
        <ForumSection
          className="forum-section"
          name="Тема2"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={messages1}
        />
        <ForumSection
          className="forum-section"
          name="Тема3"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={messages1}
        />
        <ForumSection
          className="forum-section"
          name="Тема2"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={messages1}
        />
        <ForumSection
          className="forum-section"
          name="Тема3"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={messages1}
        />

        <ForumSection
          className="forum-section"
          name="Тема2"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={messages1}
        />
        <ForumSection
          className="forum-section"
          name="Тема3"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={messages1}
        />
      </div>
      <img className={`${className}-wave wave-bg`} src={wave} alt="wave" />
    </div>
  )
}

export default ForumSectionPage

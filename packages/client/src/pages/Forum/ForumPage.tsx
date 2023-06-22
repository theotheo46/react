import Button from '../../components/Button'
import ForumSection from '../../components/ForumSection'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './ForumPage.pcss'
import wave from '../../assets/images/wave_v.svg'

const topics: string[] = [
  'Тема1',
  'Тема2',
  'Тема3',
  'Тема4',
  'Тема5',
  'Тема6',
  'Тема7',
  'Тема8',
  'Тема9',
  'Тема10',
  'Тема11',
  'Тема12',
  'Тема13',
  'Тема14',
  'Тема15',
  'Тема16',
  'Тема17',
  'Тема18',
  'Тема19',
  'Тема20',
  'Тема21',
  'Тема22',
  'Тема23',
  'Тема24',
  'Тема25',
  'Тема26',
  'Тема27',
  'Тема28',
  'Тема29',
  'Тема30',
  'Тема31',
  'Тема32',
  'Тема33',
  'Тема34',
  'Тема35',
  'Тема36',
  'Тема37',
  'Тема38',
  'Тема39',
  'Тема40',
  'Тема41',
  'Тема42',
  'Тема43',
  'Тема44',
  'Тема45',
  'Тема46',
  'Тема47',
  'Тема48',
  'Тема49',
  'Тема50',
  'Тема51',
  'Тема52',
  'Тема53',
  'Тема54',
]

const topics1: string[] = [
  'Тема1',
  'Тема2',
  'Тема3',
  'Тема4',
  'Тема5',
  'Тема6',
  'Тема7',
  'Тема8',
]

const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string
  title: string
}

const ForumPage = ({ title, className }: Props) => {
  const navigate = useNavigate()
  return (
    <div className={className}>
      <div className="header-button-container">
        <div className="header">{title}</div>
        <div className="button-container">
          <Button onClick={() => navigate(-1)} styleType="tertiary">
            <FaArrowLeft style={iconBackStyle} />
            Назад
          </Button>
          <Button styleType="primary">Создать раздел</Button>
        </div>
      </div>
      <div className="section-container">
        <ForumSection
          className="forum-section"
          name="Раздел1"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={topics}
        />
        <ForumSection
          className="forum-section"
          name="Раздел2"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={topics1}
        />
        <ForumSection
          className="forum-section"
          name="Раздел3"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={topics1}
        />
        <ForumSection
          className="forum-section"
          name="Раздел3"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={topics1}
        />
        <ForumSection
          className="forum-section"
          name="Раздел3"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={topics1}
        />
        <ForumSection
          className="forum-section"
          name="Раздел3"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={topics1}
        />
        <ForumSection
          className="forum-section"
          name="Раздел3"
          user="Дмитрий Козицкий"
          timestamp="12:05:47 22/04/2023"
          childrenElements={topics1}
        />
      </div>
      <img className={`${className}-wave wave-bg`} src={wave} alt="wave" />
    </div>
  )
}

export default ForumPage

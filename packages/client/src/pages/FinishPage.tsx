import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FinishGame from '../components/Game/FinishGame'
import { FaArrowLeft } from 'react-icons/fa'

const FinishPage = () => {
  const navigate = useNavigate()
  const iconBackStyle = { fill: 'var(--color-white)', fontSize: '1.25rem' }

  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className="container">
        <div className="page-finish-nav">
          <Button styleType="primary" onClick={() => navigate('/start')}>
            <FaArrowLeft style={iconBackStyle} />
            Главное меню
          </Button>
        </div>
        <FinishGame />
      </main>
      <img className="page-wrap__wave" src="wave.png" alt="wave" />
    </div>
  )
}

export default FinishPage

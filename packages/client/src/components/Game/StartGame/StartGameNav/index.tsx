import { useNavigate } from 'react-router-dom'
import Button from '../../../Button'
import './StartGameNav.pcss'
import iconModeBattle from '../../../../assets/icons/icon-mode-1.svg'
import iconModePuzzle from '../../../../assets/icons/icon-mode-2.svg'
import { useAppDispatch } from '../../../../store/hooks'
import { logoutUser } from '../../../../store/slices/userSlice/userAsyncThunks'

interface Props {
  onStart: () => void
}

const StartGameNav = ({ onStart }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleQuit = async () => {
    const res = await dispatch(logoutUser())
    if (logoutUser.fulfilled.match(res)) {
      navigate('/signin')
    }
  }

  return (
    <div className="game-start-nav">
      <div className="game-start-nav__switch-mode">
        <Button
          width="100%"
          height="80px"
          onClick={onStart}
          styleType="primary">
          <img src={iconModeBattle} />
          Сражения
        </Button>
        <Button
          width="100%"
          height="80px"
          onClick={onStart}
          styleType="primary">
          <img src={iconModePuzzle} />
          Головоломка
        </Button>
      </div>
      <div className="game-start-nav__btn-group">
        <Button
          width="100%"
          onClick={() => navigate('/forum')}
          styleType="primary">
          Форум
        </Button>
        <Button
          width="100%"
          onClick={() => navigate('/profile')}
          styleType="primary">
          Профиль
        </Button>
        <Button
          width="100%"
          onClick={() => navigate('/leaderbord')}
          styleType="primary">
          Лидеры
        </Button>
        <Button width="100%" onClick={() => handleQuit()} styleType="primary">
          Выйти
        </Button>
      </div>
    </div>
  )
}

export default StartGameNav

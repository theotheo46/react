import { useNavigate } from 'react-router-dom'
import Button from '../../../Button'
import './StartGameNav.pcss'
import iconModeBattle from '../../../../assets/icons/icon-mode-1.svg'
import iconModePuzzle from '../../../../assets/icons/icon-mode-2.svg'
import { useAppDispatch } from '../../../../store/hooks'
import { logoutUser } from '../../../../store/slices/userSlice/userAsyncThunks'
import { GameMode } from '../../../../store/slices/gameSlice/types'

interface Props {
  onSetupSettings: (mode: GameMode) => void
}

const StartGameNav = ({ onSetupSettings }: Props) => {
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
        <Button width="100%" height="80px" disabled={true} styleType="primary">
          <img src={iconModeBattle} />
          Сражения
        </Button>
        <Button
          width="100%"
          height="80px"
          onClick={() => onSetupSettings('puzzle')}
          styleType="primary">
          <img src={iconModePuzzle} />
          Головоломка
        </Button>
      </div>
      <div className="game-start-nav__btn-group">
        <Button
          width="100%"
          onClick={() => navigate('/forum1')}
          styleType="primary">
          Форум
        </Button>
        <Button
          width="100%"
          onClick={() => navigate('/forumsection')}
          styleType="primary">
          Раздел форума
        </Button>
        <Button
          width="100%"
          onClick={() => navigate('/forumtopic')}
          styleType="primary">
          Тема форума
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

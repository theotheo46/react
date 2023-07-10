import { useNavigate } from 'react-router-dom'
import Button from '../../../Button'
import './StartGameNav.pcss'
import iconModePuzzleLight from '../../../../assets/icons/icon-mode-2.svg'
import iconModePuzzleDark from '../../../../assets/icons/icon-mode-2-dark.svg'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { logoutUser } from '../../../../store/slices/userSlice/userAsyncThunks'
import { GameMode } from '../../../../store/slices/gameSlice/types'

interface Props {
  onSetupSettings: (mode: GameMode) => void
}

const StartGameNav = ({ onSetupSettings }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, theme } = useAppSelector(state => state.user)
  const isAuth = !!user

  const handleQuit = async () => {
    await dispatch(logoutUser())
    navigate('/signin')
  }

  return (
    <div className="game-start-nav">
      <div className="game-start-nav__switch-mode">
        <Button
          width="100%"
          height="80px"
          onClick={() => onSetupSettings('puzzle')}
          styleType="primary">
          <img
            src={theme === 'dark' ? iconModePuzzleDark : iconModePuzzleLight}
          />
          Головоломка
        </Button>
      </div>
      <div className="game-start-nav__btn-group">
        <Button
          width="100%"
          disabled={!isAuth}
          onClick={() => navigate('/forum')}
          styleType="primary">
          Форум
        </Button>
        <Button
          width="100%"
          disabled={!isAuth}
          onClick={() => navigate('/profile')}
          styleType="primary">
          Профиль
        </Button>
      </div>
      <div className="game-start-nav__btn-group">
        <Button
          width="100%"
          disabled={!isAuth}
          onClick={() => navigate('/leaderboard')}
          styleType="primary">
          Лидеры
        </Button>
        <Button width="100%" onClick={() => handleQuit()} styleType="error">
          Выйти
        </Button>
      </div>
      {!isAuth && (
        <Button
          styleType="link"
          type="button"
          onClick={() => navigate('/signin')}>
          Авторизуйтесь, чтобы открыть полный доступ к приложению
        </Button>
      )}
    </div>
  )
}

export default StartGameNav

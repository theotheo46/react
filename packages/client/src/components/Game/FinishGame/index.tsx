import './FinishGame.pcss'
import thumbUp from '../../../assets/images/thumb-up.png'
import Button from '../../Button'
import { useStartLevel } from '../../../hooks/useStartLevel'
import LoaderGame from '../LoaderGame'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  setCurrentAttempts,
  setCurrentTime,
  setMode,
} from '../../../store/slices/gameSlice'
import { useNavigate } from 'react-router-dom'
import { useNextLevel } from '../../../hooks/useNextLevel'

const FinishGame = () => {
  const { currentTime, currentLevel, currentAttempts } = useAppSelector(
    state => state.game
  )
  const { countColors, countLayersInBottle, countEmptyBottles } =
    useAppSelector(state => state.level)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { gameIsLoading, startGame } = useStartLevel()
  const { setNextLevel } = useNextLevel()

  function nextLevelHandler() {
    setNextLevel()
    startGame()
  }

  function exitGameHandler() {
    dispatch(setCurrentTime(''))
    dispatch(setCurrentAttempts(0))
    dispatch(setMode(null))
    navigate('/start')
  } 

  if (gameIsLoading) {
    return <LoaderGame />
  } else {
    const notifStr = `Уровень ${currentLevel ? currentLevel : ""} пройден\nПереливаний: ${currentAttempts}    Время: ${currentTime}`
    if (Notification && Notification.permission !== "denied") {
      Notification.requestPermission((status) => {
        if (status === "granted") {
          const n = new Notification(notifStr, {
            tag: "finishGameNotification",
          });
        } else {
          alert("Permissions for notifications are not granted");
        }
      });
    } else {
      alert("Permissions for notifications are not granted");
    }
    return (
      <div className="finish-game">
        <div className="finish-game__img">
          <img src={thumbUp} alt="thumb up" />
        </div>
        <div className="finish-game__review finish-game-review">
          <div className="finish-game-review__level">
            Уровень {currentLevel && currentLevel} пройден
          </div>
          <div className="finish-game-review__details">
            <div className="finish-game-review__item">Время: {currentTime}</div>
            <div className="finish-game-review__item">
              Переливаний: {currentAttempts}
            </div>
          </div>
          <div className="finish-game-review__details">
            <div className="finish-game-review__item">
              Цветов: {countColors}
            </div>
            <div className="finish-game-review__item">
              Ярусов: {countLayersInBottle}
            </div>
            <div className="finish-game-review__item">
              Пустых бутылок: {countEmptyBottles}
            </div>
          </div>
        </div>
        <div className="finish-game__btn">
          <Button onClick={exitGameHandler} styleType="primary">
            Главное меню
          </Button>
          <Button onClick={nextLevelHandler} styleType="primary">
            Продолжить
          </Button>
        </div>
      </div>
    )
  }
}

export default FinishGame

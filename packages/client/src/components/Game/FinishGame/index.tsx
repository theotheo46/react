import './FinishGame.pcss'
import thumbUp from '../../../assets/images/thumb-up.png'
import Button from '../../Button'
import { useStartLevel } from '../../../hooks/useStartLevel'
import LoaderGame from '../LoaderGame'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  resetLevel,
  setCountColors,
  setCountEmptyBottles,
  setCountLayersInBottle,
} from '../../../store/slices/levelSlice'
import {
  setCurrentAttempts,
  setCurrentTime,
  setLastUpdateParam,
  setMode,
  setNextLevel,
} from '../../../store/slices/gameSlice'
import { useNavigate } from 'react-router-dom'

const FinishGame = () => {
  const countAttempts = 10

  const { currentTime, currentLevel, lastUpdateParam } = useAppSelector(
    state => state.game
  )

  const navigate = useNavigate()

  const { countColors, countLayersInBottle, countEmptyBottles } =
    useAppSelector(state => state.level)
  const dispatch = useAppDispatch()
  const { gameIsLoading, startGameHandler } = useStartLevel()

  function startNextLevel() {
    updateLevel()
    dispatch(setCurrentTime(''))
    dispatch(setCurrentAttempts(0))
    dispatch(setNextLevel())
    startGameHandler()
  }

  function exitGameHandler() {
    dispatch(setCurrentTime(''))
    dispatch(setCurrentAttempts(0))
    dispatch(setMode(null))
    navigate('/start')
  }

  /*
  Алгоритм обновления уровня 
Шаг N
    Увеличить Количество цветов на 1
Шаг N+1
    Увеличить Количество ярусов на 1
Шаг N+2
    Если Количество пустых бутылок = 2 то сделать = 1 иначе сделать = 2.
     Если начали с первого хода со значения = 3 то потом уменьшить до 2 и далее по алгоритму
Шаг N+3 - вернуться к шагу N

При достижении кейса Количество цветов = Количество ярусов = 10 и Количество пустых бутылок = 1 и если при этом игрок дошел до разрешения головоломки
 - игра не оканчивается и при нажатии на кнопку продолжить переходим на начальную конфигурацию уровня 3-4-2
  */

  function updateLevel() {
    switch (true) {
      case countColors === 10 &&
        countLayersInBottle === 10 &&
        countEmptyBottles === 1:
        dispatch(resetLevel())
        break
      case (!lastUpdateParam || lastUpdateParam === 'epmtyBottles') &&
        countColors < 10:
        dispatch(setCountColors(countColors + 1))
        dispatch(setLastUpdateParam('countColors'))
        break
      case (!lastUpdateParam || lastUpdateParam === 'countColors') &&
        countLayersInBottle < 10:
        dispatch(setCountLayersInBottle(countLayersInBottle + 1))
        dispatch(setLastUpdateParam('countLayers'))
        break
      case (!lastUpdateParam || lastUpdateParam === 'countLayers') &&
        countEmptyBottles >= 1:
        countEmptyBottles === 1
          ? dispatch(setCountEmptyBottles(countEmptyBottles + 1))
          : dispatch(setCountEmptyBottles(countEmptyBottles - 1))
        dispatch(setLastUpdateParam('epmtyBottles'))
        break
      default:
        dispatch(setLastUpdateParam(''))
        break
    }
  }

  if (gameIsLoading) {
    return <LoaderGame />
  } else {
    return (
      <div className="finish-game">
        <div className="finish-game__img">
          <img src={thumbUp} alt="thumb up" />
        </div>
        <div className="finish-game__review finish-game-review">
          <div className="finish-game-review__level">
            Уровень {currentLevel} пройден
          </div>
          <div className="finish-game-review__details">
            <div className="finish-game-review__time">Время: {currentTime}</div>
            <div className="finish-game-review__attempts">
              Переливаний: {countAttempts}
            </div>
          </div>
        </div>
        <div className="finish-game__btn">
          <Button onClick={exitGameHandler} styleType="primary">
            Главное меню
          </Button>
          <Button onClick={startNextLevel} styleType="primary">
            Продолжить
          </Button>
        </div>
      </div>
    )
  }
}

export default FinishGame

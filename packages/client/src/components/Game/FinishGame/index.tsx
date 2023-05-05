import './FinishGame.pcss'
import thumbUp from '../../../assets/images/thumb-up.png'
import Button from '../../Button'

const FinishGame = () => {
  // Переменные на этапе верстки
  const finishedLevel = 1
  const finisheTime = '04:17'
  const countAttempts = 10

  function goToNextLevelHandler() {
    console.log('Go to next level')
  }

  return (
    <div className="finish-game">
      <div className="finish-game__img">
        <img src={thumbUp} alt="thumb up" />
      </div>
      <div className="finish-game__review finish-game-review">
        <div className="finish-game-review__level">
          Уровень {finishedLevel} пройден
        </div>
        <div className="finish-game-review__details">
          <div className="finish-game-review__time">Время: {finisheTime}</div>
          <div className="finish-game-review__attempts">
            Переливаний: {countAttempts}
          </div>
        </div>
      </div>
      <div className="finish-game__btn">
        <Button onClick={goToNextLevelHandler} styleType="primary">
          Продолжить
        </Button>
      </div>
    </div>
  )
}

export default FinishGame

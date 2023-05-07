import StartGameHeader from './StartGameHeader'
import StartGameImage from './StartGameImage'
import StartGameNav from './StartGameNav'
import './StartGame.pcss'
import LoaderGame from '../LoaderGame'
import { useStartLevel } from '../../../hooks/useStartLevel'

const StartGame = () => {
  const { gameIsLoading, startGameHandler } = useStartLevel()

  return (
    <div className="start-game">
      {gameIsLoading ? (
        <LoaderGame />
      ) : (
        <>
          <StartGameHeader />
          <StartGameImage />
          <StartGameNav onStart={startGameHandler} />
        </>
      )}
    </div>
  )
}

export default StartGame

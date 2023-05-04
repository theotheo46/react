import StartGameHeader from './StartGameHeader'
import StartGameImage from './StartGameImage'
import StartGameNav from './StartGameNav'
import './StartGame.pcss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoaderGame from '../LoaderGame'

const StartGame = () => {
  const [gameIsLoading, setGameIsLoading] = useState(false)
  const navigate = useNavigate()

  function startGameHandler() {
    setGameIsLoading(true)
    delayBeforeGoToLevel()
  }

  function delayBeforeGoToLevel() {
    const timer = setTimeout(() => {
      setGameIsLoading(false)
      clearTimeout(timer)
      navigate('/') // TODO: Сделать переход на страницу с уровнем
    }, 2000)
  }

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

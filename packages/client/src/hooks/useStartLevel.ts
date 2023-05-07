import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useStartLevel = () => {
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
      navigate('/level')
    }, 2000)
  }

  return { gameIsLoading, startGameHandler }
}

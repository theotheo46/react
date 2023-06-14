import { useEffect, useState } from 'react'
import { GAME_INIT } from '../store/slices/gameSlice'

export const useTimer = () => {
  const [time, setTime] = useState(0)

  let timer: ReturnType<typeof setInterval>
  const minutes = Math.floor((time % 360000) / 6000)
  const seconds = Math.floor((time % 6000) / 100)

  function timerStart() {
    timer = setInterval(() => {
      setTime(prev => prev + 100)
    }, 1000)
  }
  function timerStop() {
    clearInterval(timer)
  }
  function timerReset() {
    clearInterval(timer)
    setTime(0)
    localStorage.removeItem(GAME_INIT.currentTime)
  }

  function getTime() {
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }
  useEffect(() => {
    setTime(Number(localStorage.getItem(GAME_INIT.currentTime)))
  }, [])
  useEffect(() => {
    localStorage.setItem(GAME_INIT.currentTime, JSON.stringify(time))
  }, [time])

  return { timerStart, timerStop, timerReset, getTime, time }
}

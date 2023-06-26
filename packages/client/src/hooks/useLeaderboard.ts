import { baseApi } from '../api/baseApi'
import { useAppSelector } from '../store/hooks'

export const useLeaderboard = () => {
  const { user } = useAppSelector(state => state.user)
  const { currentLevel, currentAttempts } = useAppSelector(state => state.game)

  /*
    convertToSeconds('02:20')
    time: '00:12' -> 12
    time: '02:20' -> 180
  */
  const convertToSeconds = (time: string) => {
    const [min, sec] = time.split(':').map(item => Number(item))
    return min * 60 + sec
  }

  const setValueToLeaderboard = (time: string) => {
    if (user?.id && currentLevel) {
      baseApi('local')
        .post('/leaderboard/setleader', {
          userId: user?.id,
          usernick: user?.display_name || user?.login,
          level: currentLevel,
          steps: currentAttempts + 1,
          time: convertToSeconds(time),
          score: '',
        })
        .catch(err => {
          console.error(err.message)
        })
    } else {
      return
    }
  }

  const getLeaders = (limit = 10) => {
    return baseApi('local').get(`/leaderboard/gettopleaders/?number=${limit}`)
  }

  return { setValueToLeaderboard, getLeaders }
}

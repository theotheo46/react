import LeaderboardItem from '../LeaderboardItem'
import './LeaderboardList.pcss'
import { useEffect, useState } from 'react'
import { useLeaderboard } from '../../../hooks/useLeaderboard'

type UserLeaderboard = {
  createdAt: string
  id: number
  level: number
  score: number
  steps: number
  time: number
  updatedAt: string
  userId: number
  usernick: string
}

const LeaderboardList = () => {
  const { getLeaders } = useLeaderboard()
  const [users, setUsers] = useState<UserLeaderboard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const limitLeaders = 10

  useEffect(() => {
    setIsLoading(true)
    getLeaders(limitLeaders).then(users => {
      setUsers(users.data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="leaderboard-list">
      <div className="leaderboard-list__header list-header">
        <div className="list-header__player ">Игрок</div>
        <div className="list-header__data">Дата</div>
        <div className="list-header__level">Счёт</div>
      </div>
      {!users.length && !isLoading && (
        <div className="leaderboard-list__empty-state">Список лидеров пуст</div>
      )}
      {users.map((user, index) => (
        <LeaderboardItem
          data={user.createdAt}
          position={index + 1}
          display_name={user.usernick}
          level={user.score}
          key={user.id}
        />
      ))}
    </div>
  )
}

export default LeaderboardList

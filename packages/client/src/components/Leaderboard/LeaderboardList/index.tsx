import LeaderboardItem from '../LeaderboardItem'
import defaultAvatar from '../../../assets/images/default-avatar.jpg'
import './LeaderboardList.pcss'
import { useState } from 'react'

const mockUsers = [
  {
    id: 1,
    display_name: 'Bret',
    level: 1023,
    avatar: defaultAvatar,
  },
  {
    id: 2,
    display_name: 'Antonette',
    level: 238,
    avatar: defaultAvatar,
  },
  {
    id: 3,
    display_name: 'Samantha',
    level: 18,
    avatar: defaultAvatar,
  },
  {
    id: 4,
    display_name: 'Karianne',
    level: 10,
    avatar: defaultAvatar,
  },
  {
    id: 5,
    display_name: 'Kamren',
    level: 1,
    avatar: defaultAvatar,
  },
  {
    id: 6,
    display_name: 'Leopoldo_Corkery',
    level: 0,
    avatar: defaultAvatar,
  },
]

const LeaderboardList = () => {
  const [users] = useState(mockUsers)

  return (
    <div className="leaderboard-list">
      <div className="leaderboard-list__header list-header">
        <div className="list-header__player ">Игрок</div>
        <div className="list-header__level">Уровень</div>
      </div>
      {users.map((user, index) => (
        <LeaderboardItem
          avatar={user.avatar}
          position={index + 1}
          display_name={user.display_name}
          level={user.level}
          key={user.id}
        />
      ))}
    </div>
  )
}

export default LeaderboardList

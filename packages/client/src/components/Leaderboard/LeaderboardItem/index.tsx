import './LeaderboardItem.pcss'

interface Props {
  display_name: string
  level: number
  position: number
  avatar?: string
  data: string
}

const LeaderboardItem = ({ display_name, level, position, data }: Props) => {
  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-Ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  }
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__position">{position}</div>
      {/* <div className="leaderboard-item__avatar">
        <img src={avatar} alt={display_name} />
      </div> */}
      <div className="leaderboard-item__name">{display_name}</div>
      <div className="leaderboard-item__data">{getDate(data)}</div>
      <div className="leaderboard-item__level">{level}</div>
    </div>
  )
}

export default LeaderboardItem

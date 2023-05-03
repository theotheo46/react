import './LeaderboardItem.pcss'

interface Props {
  display_name: string
  level: number
  position: number
  avatar: string
}

const LeaderboardItem = ({ display_name, level, position, avatar }: Props) => {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__position">{position}</div>
      <div className="leaderboard-item__avatar">
        <img src={avatar} alt={display_name} />
      </div>
      <div className="leaderboard-item__name">{display_name}</div>
      <div className="leaderboard-item__level">{level}</div>
    </div>
  )
}

export default LeaderboardItem

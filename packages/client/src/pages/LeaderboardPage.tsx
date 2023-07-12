import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { FaArrowLeft } from 'react-icons/fa'
import LeaderboardList from '../components/Leaderboard/LeaderboardList'

const LeaderboardPage = () => {
  const navigate = useNavigate()

  const pageTitle = 'Leaderboard | Water Puzzle'
  const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

  useEffect(() => {
    document.title = pageTitle
  }, [])

  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className="container card card_full">
        <div className="card__header">
          <Button onClick={() => navigate(-1)} styleType="tertiary">
            <FaArrowLeft style={iconBackStyle} />
            Назад
          </Button>
          <h1 className="page-title">Таблица лидеров</h1>
        </div>
        <LeaderboardList />
      </main>
    </div>
  )
}

export default LeaderboardPage

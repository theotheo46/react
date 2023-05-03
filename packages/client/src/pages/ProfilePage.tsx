import Button from '../components/Button'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Profile from '../components/Profile'
import { useEffect } from 'react'

const ProfilePage = () => {
  const navigate = useNavigate()

  const pageTitle = 'Profile | Water Puzzle'
  const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

  useEffect(() => {
    document.title = pageTitle
  }, [])

  return (
    <div className="page-wrap page-wrap_blue">
      <main className="container card card_full">
        <Button onClick={() => navigate(-1)} styleType="tertiary">
          <FaArrowLeft style={iconBackStyle} />
          Назад
        </Button>
        <Profile />
      </main>
    </div>
  )
}

export default ProfilePage

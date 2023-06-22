import { useNavigate } from 'react-router-dom'
import Profile from '../components/Profile'
import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Button from '../components/Button'
import wave from '../assets/images/wave_v.svg'

const ProfilePage = () => {
  const navigate = useNavigate()

  const pageTitle = 'Profile | Water Puzzle'
  const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

  useEffect(() => {
    document.title = pageTitle
  }, [])

  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className="container card card_full">
        <Button onClick={() => navigate(-1)} styleType="tertiary">
          <FaArrowLeft style={iconBackStyle} />
          Назад
        </Button>

        <Profile />
      </main>
      <img className="page-wrap__wave wave-bg" src={wave} alt="wave" />
    </div>
  )
}

export default ProfilePage

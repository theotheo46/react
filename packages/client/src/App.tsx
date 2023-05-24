import { useEffect } from 'react'
import './styles/App.pcss'
import RoutesBase from './routes/routes'
import { useAppDispatch } from './store/hooks'
import { getUser } from './store/slices/userSlice/userAsyncThunks'
import { useLocation, useNavigate } from 'react-router-dom'
import { createLevels } from './store/slices/levelSlice'

window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = navigator.serviceWorker.register('/sw.js', { type: 'module' })
      console.log('service worker register success:', reg)
    } catch (e) {
      console.error('service worker register fail', e)
    }
  }
})

function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }
    fetchServerData()
    loadUser()
    dispatch(createLevels())
  }, [])

  useEffect(() => {
    loadUser()
  }, [location])

  async function loadUser() {
    const openRoutes = ['/', '/level', '/finish', '/signin', '/signup']
    if (!openRoutes.some(path => path === location.pathname)) {
      const res = await dispatch(getUser())
      if (getUser.rejected.match(res)) {
        navigate('/signin')
      }
    }
  }

  return <RoutesBase />
}

export default App

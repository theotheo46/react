import { useEffect } from 'react'
import './styles/App.pcss'
import RoutesBase from './routes/routes'
import { useAppDispatch } from './store/hooks'
import { getUser } from './store/slices/userSlice/userAsyncThunks'
import { useNavigate } from 'react-router-dom'

window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = navigator.serviceWorker.register('/sw.js')
      console.log('service worker register success:', reg)
    } catch (e) {
      console.error('service worker register fail', e)
    }
  }
})

function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }
    fetchServerData()
    loadUser()
  }, [])

  async function loadUser() {
    const res = await dispatch(getUser())
    if (getUser.rejected.match(res)) {
      navigate('/signin')
    }
  }

  // return <div className="App">Вот тут будет жить ваше приложение :)</div>
  return <RoutesBase />
}

export default App

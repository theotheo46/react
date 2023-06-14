import { useEffect } from 'react'
import './styles/App.pcss'
import RoutesBase from './routes/routes'
import { useAppDispatch } from './store/hooks'
import {
  createLevels,
  setLastUpdateLevelParam,
} from './store/slices/levelSlice'
import AuthContext from './context/AuthContext'
import { setLastUpdateGameParam } from './store/slices/gameSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }
    fetchServerData()
    dispatch(createLevels())
    dispatch(setLastUpdateGameParam())
    dispatch(setLastUpdateLevelParam())
  }, [])

  return (
    <AuthContext>
      <RoutesBase />
    </AuthContext>
  )
}

export default App

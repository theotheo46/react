import { useEffect } from 'react'
import './styles/App.pcss'
import RoutesBase from './routes/routes'
import { useAppDispatch, useAppSelector } from './store/hooks'
import {
  createLevels,
  setLastUpdateLevelParam,
} from './store/slices/levelSlice'
import AuthContext from './context/AuthContext'
import { setLastUpdateGameParam } from './store/slices/gameSlice'
import { useTheme } from './hooks/useTheme'

function App() {
  const dispatch = useAppDispatch()

  const { user, theme } = useAppSelector(state => state.user)
  const { getUserTheme } = useTheme()

  useEffect(() => {
    // const fetchServerData = async () => {
    //   const url = `http://localhost:${__SERVER_PORT__}/api`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   console.log(data)
    // }
    // fetchServerData()
    dispatch(createLevels())
    dispatch(setLastUpdateGameParam())
    dispatch(setLastUpdateLevelParam())
  }, [])

  useEffect(() => {
    getUserTheme(user?.id)
  }, [user])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <AuthContext>
      <RoutesBase />
    </AuthContext>
  )
}

export default App

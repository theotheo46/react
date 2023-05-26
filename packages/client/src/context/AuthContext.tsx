import { ReactNode, useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser } from '../store/slices/userSlice/userAsyncThunks'

interface Props {
  children?: ReactNode
}

const AuthContext = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const protectedRoutes = [
    '/profile',
    '/forum',
    '/leaderbord',
    '/forumsection',
    '/forumtopic'
  ]
  const regRoutes = ['/signin', '/signup']

  async function loadUser() {
    const res = await dispatch(getUser())
    if (
      getUser.rejected.match(res) &&
      protectedRoutes.some(path => path === location.pathname)
    ) {
      navigate('/signin')
    } else if (
      getUser.fulfilled.match(res) &&
      regRoutes.some(path => path === location.pathname)
    ) {
      navigate('/start')
    }
  }

  useEffect(() => {
    loadUser()
  }, [location])

  return <>{children}</>
}

export default AuthContext

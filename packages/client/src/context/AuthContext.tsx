import { ReactNode, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { OAuth, getUser } from '../store/slices/userSlice/userAsyncThunks'
import { RequestOAuthData } from '../store/slices/userSlice/types'
import Modal from '../components/Modal'
import ErrorInformer from '../components/ErrorInformer'

interface Props {
  children?: ReactNode
}

const AuthContext = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAppSelector(state => state.user)
  const [error, setError] = useState('')
  const firstRender = useRef(true)
  const protectedRoutes = [
    '/profile',
    '/forum',
    '/leaderboard',
    '/forumsection',
    '/forumtopic',
  ]
  const regRoutes = ['/signin', '/signup']

  const checkQueryCode = async () => {
    const query = new URLSearchParams(location.search)
    const code = query.get('code') // query параметр ?code приходит после OAuth редиректа с сайта Яндекса, поэтому здесь мы ловим этот переход
    const data: RequestOAuthData = {
      code: code || '',
      redirect_uri: 'http://localhost:3000', // TODO Редирект будет с сайта Яндекса, поэтому нужен полный путь. Изменить в продакшене на необходимый урл.
    }
    const res = await dispatch(OAuth(data))

    if (OAuth.fulfilled.match(res)) {
      document.location = `http://localhost:${__SERVER_PORT__}/start`
    } else {
      setError(res.payload || res.error.message || 'Error')
    }
  }

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
    if (location.search.includes('code')) {
      checkQueryCode()
    }
    if (firstRender.current) {
      loadUser()
    } else {
      if (!user && protectedRoutes.some(path => path === location.pathname)) {
        navigate('/signin')
      } else if (user && regRoutes.some(path => path === location.pathname)) {
        navigate('/start')
      }
    }

    firstRender.current = false
  }, [user, error])

  return (
    <>
      {children}
      {error && (
        <Modal
          title="Не удалось войти в аккаунт"
          onClose={() => {
            setError('')
          }}>
          <ErrorInformer
            errorCode="401"
            errorText={error}
            errorStatus="Попробуйте войти в аккаунт позже."
          />
        </Modal>
      )}
    </>
  )
}

export default AuthContext

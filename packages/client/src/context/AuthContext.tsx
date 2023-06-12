import { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch } from '../store/hooks'
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
  const [error, setError] = useState('')
  const protectedRoutes = [
    '/profile',
    '/forum',
    '/leaderbord',
    '/forumsection',
    '/forumtopic',
  ]
  const regRoutes = ['/signin', '/signup']

  const checkQueryCode = async () => {
    if (!location.search.includes('code')) return loadUser()
    // query параметр ?code приходит после OAuth редиректа с сайта Яндекса, поэтому здесь мы ловим этот переход
    const query = new URLSearchParams(location.search)
    const code = query.get('code')

    const data: RequestOAuthData = {
      code: code || '',
      redirect_uri: 'http://localhost:3000', // TODO Редирект будет с сайта Яндекса, поэтому нужен полный путь. Изменить в продакшене на необходимый урл.
    }

    const res = await dispatch(OAuth(data))

    if (OAuth.fulfilled.match(res)) {
      await dispatch(getUser())
      navigate('/start')
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
    checkQueryCode()
  }, [location])

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

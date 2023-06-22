/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useEffect, useRef, useState } from 'react'
import { baseApi } from '../api/baseApi'
import { useNavigate } from 'react-router-dom'
import {
  RequestCreateUserData,
  RequestLoginData,
  RequestUpdatePasswordData,
  RequestUpdateUserData,
  User,
} from '../store/slices/userSlice/types'

interface UserContextProps {
  user: User | null
  error: string
  isPending: boolean
  getUser: () => void
  logout: () => void
  createUser: (data: RequestCreateUserData) => void
  loginUser: (data: RequestLoginData) => void
  updateUser: (data: RequestUpdateUserData) => void
  updateAvatar: (data: FormData) => void
  updatePassword: (data: RequestUpdatePasswordData) => void
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  error: '',
  isPending: false,
  getUser: () => {},
  logout: () => {},
  createUser: (data: RequestCreateUserData) => {},
  loginUser: (data: RequestLoginData) => {},
  updateUser: (data: RequestUpdateUserData) => {},
  updateAvatar: (data: FormData) => {},
  updatePassword: (data: RequestUpdatePasswordData) => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)
  const firstRender = useRef(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (firstRender.current) {
      getUser().catch(reject => {
        navigate('/signin')
      })
    }
    if (!firstRender.current && !user) {
      navigate('/signin')
    }
    firstRender.current = false
  }, [error])

  async function getUser() {
    try {
      setIsPending(true)
      setError('')
      const res = await baseApi().get<User>('/auth/user')
      setUser(res.data)
    } catch (error) {
      const { message } = error as Error
      setError(message)
      console.error(message)
    } finally {
      setIsPending(false)
    }
  }

  async function createUser(data: RequestCreateUserData) {
    try {
      setIsPending(true)
      setError('')
      await baseApi().post('/auth/signup', data)
      await getUser()
      navigate('/start')
    } catch (error) {
      const { message } = error as Error
      setError(message)
      console.error(message)
    } finally {
      setIsPending(false)
    }
  }

  async function loginUser(data: RequestLoginData) {
    try {
      setIsPending(true)
      setError('')
      await baseApi().post('/auth/signin', data)
      await getUser()
      navigate('/start')
    } catch (error) {
      const { message } = error as Error
      setError(message)
      console.error(message)
    } finally {
      setIsPending(false)
    }
  }

  async function logout() {
    try {
      setIsPending(true)
      setError('')
      await baseApi().post('/auth/logout')
      setUser(null)
      navigate('/signin')
    } catch (error) {
      const { message } = error as Error
      setError(message)
      console.error(message)
    } finally {
      setIsPending(false)
    }
  }

  async function updateUser(data: RequestUpdateUserData) {
    try {
      setIsPending(true)
      const res = await baseApi().put<User>('/user/profile', data)

      setUser(prev => {
        if (prev) {
          return { ...prev, ...res.data }
        }
        return prev
      })
    } catch (error) {
      const { message } = error as Error
      console.error(message)
    } finally {
      setIsPending(false)
    }
  }

  async function updateAvatar(data: FormData) {
    try {
      setIsPending(true)
      const res = await baseApi().put<User>('/user/profile/avatar', data)
      setUser(prev => ({ ...prev, ...res.data }))
    } catch (error) {
      const { message } = error as Error
      console.error(message)
    } finally {
      setIsPending(false)
    }
  }

  async function updatePassword(data: RequestUpdatePasswordData) {
    try {
      setIsPending(true)
      const res = await baseApi().put('/user/password', data)
    } catch (error) {
      const { message } = error as Error
      console.error(message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        loginUser,
        createUser,
        logout,
        error,
        isPending,
        updateUser,
        updateAvatar,
        updatePassword,
      }}>
      {children}
    </UserContext.Provider>
  )
}

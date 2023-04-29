/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useEffect, useRef, useState } from 'react'
import { baseApi } from '../api/baseApi'

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export interface RequestLoginData {
  login: string
  password: string
}

export interface RequestUpdateUserData {
  data: Omit<User, 'avatar'>
}

export interface RequestUpdatePasswordData {
  oldPassword: string
  newPassword: string
}

interface UserContextProps {
  user: User | null
  error: string
  isPending: boolean
  getUser: () => void
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

  // Тестовый юзер, пока нет формы авторизации
  const testUser: RequestLoginData = {
    login: 'Bret123',
    password: 'KJkjhjs890hjhgd',
  }

  useEffect(() => {
    if (firstRender) {
      getUser()
    }
    if (!firstRender.current && !user) {
      loginUser()
    }
    firstRender.current = false
  }, [error])

  async function getUser() {
    try {
      setIsPending(true)
      setError('')
      const res = await baseApi.get<User>('/auth/user')
      setUser(res.data)
    } catch (error) {
      const { message } = error as Error
      setError(message)
      console.error(message)
    } finally {
      setIsPending(false)
    }
  }

  async function loginUser(data = testUser) {
    try {
      setIsPending(true)
      await baseApi.post('/auth/signin', data)
      await getUser()
    } catch (error) {
      const { message } = error as Error
      console.error(message)
    } finally {
      setIsPending(false)
    }
  }

  async function updateUser(data: RequestUpdateUserData) {
    try {
      setIsPending(true)
      const res = await baseApi.put<User>('/user/profile', data)

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
      const res = await baseApi.put<User>('/user/profile/avatar', data)
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
      const res = await baseApi.put('/user/password', data)
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

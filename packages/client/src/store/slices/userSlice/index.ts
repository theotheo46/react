import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { User, UserThemes } from './types'
import {
  OAuth,
  createUser,
  getServiceId,
  getUser,
  loginUser,
  logoutUser,
  updateAvatar,
  updatePassword,
  updateUser,
  getTheme,
  setTheme,
} from './userAsyncThunks'

interface UserState {
  user: User | null
  theme: UserThemes
  error: string
  isPending: boolean
}

const initialState: UserState = {
  user: null,
  theme: 'light',
  error: '',
  isPending: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getThemeFromLS: state => {
      const theme = localStorage.getItem('theme') as UserThemes
      if (theme) {
        state.theme = theme
      }
    },
    setThemeToLS: (state, action: PayloadAction<UserThemes>) => {
      const theme = action.payload
      localStorage.setItem('theme', theme)
      state.theme = theme
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isPending = false
        state.error = ''
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null
        state.isPending = false
        state.error = ''
      })
      .addCase(loginUser.fulfilled, state => {
        state.isPending = false
        state.error = ''
      })
      .addCase(createUser.fulfilled, state => {
        state.isPending = false
        state.error = ''
      })
      .addCase(OAuth.fulfilled, state => {
        state.isPending = false
        state.error = ''
      })
      .addCase(getServiceId.fulfilled, state => {
        state.isPending = false
        state.error = ''
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isPending = false
        state.error = ''
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user = action.payload
        state.isPending = false
        state.error = ''
      })
      .addCase(updatePassword.fulfilled, state => {
        state.isPending = false
        state.error = ''
      })
      .addCase(getTheme.fulfilled, (state, action) => {
        state.isPending = false
        state.theme = action.payload
        state.error = ''
      })
      .addCase(setTheme.fulfilled, (state, action) => {
        state.isPending = false
        state.theme = action.payload
        state.error = ''
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.isPending = false
      })
      .addMatcher(isPending, state => {
        state.isPending = true
        state.error = ''
      })
  },
})

export const { getThemeFromLS, setThemeToLS } = userSlice.actions

export default userSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
  return action.type.endsWith('pending')
}

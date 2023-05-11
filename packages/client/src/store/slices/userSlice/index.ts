import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { User } from './types'
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
  updateAvatar,
  updatePassword,
  updateUser,
} from './userAsyncThunks'

interface UserState {
  user: User | null
  error: string
  isPending: boolean
}

const initialState: UserState = {
  user: null,
  error: '',
  isPending: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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

export default userSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
  return action.type.endsWith('pending')
}

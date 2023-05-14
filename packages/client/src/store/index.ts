import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import gameReducer from './slices/gameSlice'
import levelReducer from './slices/levelSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    level: levelReducer
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

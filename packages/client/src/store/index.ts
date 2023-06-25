import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import gameReducer from './slices/gameSlice'
import levelReducer from './slices/levelSlice'
import forumReducer from './slices/forumSlice'

const store = create()

export function create(initialState?: any) {
  return configureStore({
    reducer: {
      user: userReducer,
      game: gameReducer,
      level: levelReducer,
      forum: forumReducer,
    },
    preloadedState: initialState,
  })
}

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

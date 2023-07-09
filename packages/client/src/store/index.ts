import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import gameReducer from './slices/gameSlice'
import levelReducer from './slices/levelSlice'
import forumReducer from './slices/forumSlice'
import { UserService } from '../api/UserService'
import { YandexAPIRepository } from '../repository/YandexAPIRepository'

const store = create(new UserService(new YandexAPIRepository()))

export function create(service: UserService, initialState?: any) {
  return configureStore({
    reducer: {
      user: userReducer,
      game: gameReducer,
      level: levelReducer,
      forum: forumReducer,
    },
    preloadedState: initialState,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: service,
        },
      })
    },
  })
}

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

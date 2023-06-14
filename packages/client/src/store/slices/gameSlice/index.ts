import { GameMode } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  mode: GameMode | null
  isSetupLevelSettings: boolean
  currentLevel: number | null
  currentAttempts: number
  currentTime: string
  lastUpdateParam: string
}

export const GAME_INIT = {
  mode: 'game-mode',
  currentLevel: 'game-current-level',
  currentAttempts: 'game-current-attempts',
  currentTime: 'game-current-time',
  isSetupLevelSettings: 'game-is-setup-settings',
  lastUpdateParam: 'game-last-update-param',
}

const initialState: GameState = {
  mode: null,
  currentLevel: null,
  currentAttempts: 0,
  currentTime: '',
  isSetupLevelSettings: false,
  lastUpdateParam: '',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<GameMode | null>) => {
      state.mode = action.payload
      action.payload
        ? localStorage.setItem(GAME_INIT.mode, JSON.stringify(action.payload))
        : localStorage.removeItem(GAME_INIT.mode)
    },
    setIsSetupLevelSettings: (state, action: PayloadAction<boolean>) => {
      state.isSetupLevelSettings = action.payload
      action.payload
        ? localStorage.setItem(
            GAME_INIT.isSetupLevelSettings,
            JSON.stringify(action.payload)
          )
        : localStorage.removeItem(GAME_INIT.isSetupLevelSettings)
    },
    setCurrentTime: (state, action: PayloadAction<string>) => {
      state.currentTime = action.payload
      action.payload
        ? localStorage.setItem(
            GAME_INIT.currentTime,
            JSON.stringify(action.payload)
          )
        : localStorage.removeItem(GAME_INIT.currentTime)
    },
    setNextLevel: state => {
      if (state.currentLevel) {
        state.currentLevel += 1
        localStorage.setItem(
          GAME_INIT.currentLevel,
          JSON.stringify(state.currentLevel)
        )
      }
    },
    setCurrentLevel: (state, action: PayloadAction<number | null>) => {
      state.currentLevel = action.payload
      localStorage.setItem(
        GAME_INIT.currentLevel,
        JSON.stringify(action.payload)
      )
    },
    setLastUpdateGameParam: state => {
      state.mode = (localStorage.getItem(GAME_INIT.mode) as GameMode) || null
      state.currentLevel =
        Number(localStorage.getItem(GAME_INIT.currentLevel)) || null
      state.currentAttempts =
        Number(localStorage.getItem(GAME_INIT.currentAttempts)) || 0
      state.currentTime = localStorage.getItem(GAME_INIT.currentTime) || ''
      state.isSetupLevelSettings =
        Boolean(localStorage.getItem(GAME_INIT.isSetupLevelSettings)) || false
      state.lastUpdateParam =
        localStorage.getItem(GAME_INIT.lastUpdateParam) || ''
    },
    setCurrentAttempts(state, action: PayloadAction<number>) {
      state.currentAttempts = action.payload
      localStorage.setItem(
        GAME_INIT.currentAttempts,
        JSON.stringify(action.payload)
      )
    },
  },
})

export const {
  setMode,
  setIsSetupLevelSettings,
  setCurrentTime,
  setNextLevel,
  setLastUpdateGameParam,
  setCurrentAttempts,
  setCurrentLevel,
} = gameSlice.actions
export default gameSlice.reducer

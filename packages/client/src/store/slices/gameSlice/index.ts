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
    },
    setIsSetupLevelSettings: (state, action: PayloadAction<boolean>) => {
      state.isSetupLevelSettings = action.payload
    },
    setCurrentTime: (state, action: PayloadAction<string>) => {
      state.currentTime = action.payload
    },
    setNextLevel: state => {
      if (state.currentLevel) {
        state.currentLevel += 1
      }
    },
    setCurrentLevel: (state, action: PayloadAction<number | null>) => {
      state.currentLevel = action.payload
    },
    setLastUpdateParam(state, action: PayloadAction<string>) {
      state.lastUpdateParam = action.payload
    },
    setCurrentAttempts(state, action: PayloadAction<number>) {
      state.currentAttempts = action.payload
    },
  },
})

export const {
  setMode,
  setIsSetupLevelSettings,
  setCurrentTime,
  setNextLevel,
  setLastUpdateParam,
  setCurrentAttempts,
  setCurrentLevel,
} = gameSlice.actions
export default gameSlice.reducer

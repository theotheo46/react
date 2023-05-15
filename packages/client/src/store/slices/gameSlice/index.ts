import { GameDifficulty, GameMode } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  mode: GameMode | null
  isSetupLevelSettings: boolean
  currentLevel: number
  currentAttempts: number
  currentTime: string
  lastUpdateParam: string
  // selectedDifficulty: GameDifficulty | null
}

const initialState: GameState = {
  mode: null,
  currentLevel: 0,
  currentAttempts: 0,
  currentTime: '',
  isSetupLevelSettings: false,
  lastUpdateParam: ''
  // selectedDifficulty: null,
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
      state.currentLevel += 1
    },
    setLastUpdateParam(state, action: PayloadAction<string>) {
      state.lastUpdateParam = action.payload
    },
    setCurrentAttempts(state, action:PayloadAction<number>) {
      state.currentAttempts = action.payload
    }
  },
})

export const {
  setMode,
  setIsSetupLevelSettings,
  setCurrentTime,
  setNextLevel,
  setLastUpdateParam,
  setCurrentAttempts
} = gameSlice.actions
export default gameSlice.reducer

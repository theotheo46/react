import { GameDifficulty, GameMode } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  mode: GameMode | null
  isSetupLevelSettings: boolean
  currentLevel: number
  currentAttempts: number
  currentTime: string
  // selectedDifficulty: GameDifficulty | null
}

const initialState: GameState = {
  mode: null,
  currentLevel: 0,
  currentAttempts: 0,
  currentTime: '',
  isSetupLevelSettings: false,
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
  },
})

export const {
  setMode,
  setIsSetupLevelSettings,
  setCurrentTime,
  setNextLevel,
} = gameSlice.actions
export default gameSlice.reducer

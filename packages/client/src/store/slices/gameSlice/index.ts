import { GameMode } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  mode: GameMode | null
  isSetupLevelSettings: boolean
  currentLevel: number | null
  currentAttempts: number
  currentTime: string
  lastUpdateParam: string
  idTypeContourBottle: number
}

const initialState: GameState = {
  mode: null,
  currentLevel: null,
  currentAttempts: 0,
  currentTime: '',
  isSetupLevelSettings: false,
  lastUpdateParam: '',
  idTypeContourBottle: 0,
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
    setIdTypeContourBottle(state, action: PayloadAction<number>) {
      state.idTypeContourBottle = action.payload
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
  setIdTypeContourBottle,
} = gameSlice.actions
export default gameSlice.reducer

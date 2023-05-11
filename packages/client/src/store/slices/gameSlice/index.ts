import { GameDifficulty, GameMode } from './types'
import { createSlice } from '@reduxjs/toolkit'

interface GameState {
  mode: GameMode | null
  currentLevel: number
  currentAttempts: number
  currentTime: string
  selectedDifficulty: GameDifficulty | null
}

const initialState: GameState = {
  mode: null,
  currentLevel: 0,
  currentAttempts: 0,
  currentTime: '',
  selectedDifficulty: null,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
})

export default gameSlice.reducer

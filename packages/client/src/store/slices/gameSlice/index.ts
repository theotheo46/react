import { GameDifficulty, GameMode } from './types'
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'

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
  reducers: {
    setCurrentCountAttempts: (state, action: PayloadAction<number>) => {
      state.currentAttempts = action.payload
    },
  },
})

export const { setCurrentCountAttempts } = gameSlice.actions
export default gameSlice.reducer

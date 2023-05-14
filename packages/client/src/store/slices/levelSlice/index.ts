import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LevelState {
  countColors: number
  countLayersInBottle: number
  countEmptyBottles: number
  startColorsForRestart: string[]
}


const initialState: LevelState = {
  countColors: 6,
  countLayersInBottle: 4,
  countEmptyBottles: 2,
  startColorsForRestart: []
}

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setStartColorsForRestart: (state, action: PayloadAction<string[]>) => {
      state.startColorsForRestart = action.payload
    }
  }
})

export const { setStartColorsForRestart } = levelSlice.actions
export default levelSlice.reducer

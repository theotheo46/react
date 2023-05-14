import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LevelState {
  countColors: number
  countLayersInBottle: number
  countEmptyBottles: number
}


const initialState: LevelState = {
  countColors: 6,
  countLayersInBottle: 4,
  countEmptyBottles: 2,
}

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {

  },
})

export const {

} = levelSlice.actions
export default levelSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import FillTypeColor from '../../../components/Bottle/FillTypeColor'

interface LevelState {
  countColors: number
  countLayersInBottle: number
  countEmptyBottles: number
  startColorsForRestart: string[]
  selectedColor: string
  selectedKeyBottle: string
}


const initialState: LevelState = {
  countColors: 6,
  countLayersInBottle: 4,
  countEmptyBottles: 2,
  startColorsForRestart: [],
  selectedKeyBottle: '-1',
  selectedColor: JSON.stringify(FillTypeColor.TypeEmptyColor)
}

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setStartColorsForRestart: (state, action: PayloadAction<string[]>) => {
      state.startColorsForRestart = action.payload
    },
    setSelectedColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload
    },
    setSelectedKeyBottle: (state, action: PayloadAction<string>) => {
      state.selectedKeyBottle = action.payload
    }
  }
})

export const { setStartColorsForRestart, setSelectedColor, setSelectedKeyBottle } = levelSlice.actions
export default levelSlice.reducer

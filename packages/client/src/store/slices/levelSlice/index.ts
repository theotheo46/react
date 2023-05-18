import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import FillTypeColor from '../../../components/Bottle/FillTypeColor'

interface LevelState {
  countColors: number
  countLayersInBottle: number
  countEmptyBottles: number
  startColorsForRestart: string[]
  selectedColor: string
  countColorNeedTransfuse: number
  selectedKeyBottle: string
  minCountColors: number
  maxCountColors: number
  minCountLayersInBottle: number
  maxCountLayersInBottle: number
  minCountEmptyBottles: number
  maxCountEmptyBottles: number
}

const LIMIT = 10
const INIT_COUNT_COLORS = 3
const INIT_COUNT_LAYERS = 4
const INIT_EMPTY_BOTTLES = 2
const MIN_EMPTY_BOTTLES = 1
const LIMIT_EMPTY_BOTTLES = 3

const initialState: LevelState = {
  startColorsForRestart: [],
  selectedKeyBottle: '-1',
  countColorNeedTransfuse: 1,
  selectedColor: JSON.stringify(FillTypeColor.TypeEmptyColor),
  countColors: INIT_COUNT_COLORS,
  countLayersInBottle: INIT_COUNT_LAYERS,
  countEmptyBottles: INIT_EMPTY_BOTTLES,
  minCountColors: INIT_COUNT_COLORS,
  minCountLayersInBottle: INIT_COUNT_LAYERS,
  minCountEmptyBottles: MIN_EMPTY_BOTTLES,
  maxCountColors: LIMIT,
  maxCountLayersInBottle: LIMIT,
  maxCountEmptyBottles: LIMIT_EMPTY_BOTTLES,
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
    },
    setCountColorNeedTransfuse: (state, action: PayloadAction<number>) => {
      state.countColorNeedTransfuse = action.payload
    },
    setCountColors: (state, action: PayloadAction<number>) => {
      state.countColors = action.payload
    },
    setCountLayersInBottle: (state, action: PayloadAction<number>) => {
      state.countLayersInBottle = action.payload
    },
    setCountEmptyBottles: (state, action: PayloadAction<number>) => {
      state.countEmptyBottles = action.payload
    },
    updateLayersInBottle: state => {
      if (state.countColors !== state.countLayersInBottle) {
        state.countLayersInBottle =
          state.countColors === LIMIT
            ? state.countColors
            : state.countColors + 1
      }
      state.minCountLayersInBottle =
        state.countColors === LIMIT ? state.countColors : state.countColors + 1
    },
    resetLevel: state => {
      state.countColors = INIT_COUNT_COLORS
      state.countEmptyBottles = INIT_EMPTY_BOTTLES
      state.countLayersInBottle = INIT_COUNT_LAYERS
    },
  },
})

export const {
  setStartColorsForRestart,
  setSelectedColor,
  setSelectedKeyBottle,
  setCountColorNeedTransfuse,
  setCountColors,
  setCountLayersInBottle,
  setCountEmptyBottles,
  updateLayersInBottle,
  resetLevel,
} = levelSlice.actions
export default levelSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import FillTypeColor from '../../../components/Bottle/FillTypeColor'

export interface Level {
  countColors: number
  countLayersInBottle: number
  countEmptyBottles: number
}

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
  levels: Level[]
  idTypeContourBottle: number
}

const LIMIT = 10
const INIT_COUNT_COLORS = 3
const INIT_COUNT_LAYERS = 3
const INIT_EMPTY_BOTTLES = 2
const MIN_EMPTY_BOTTLES = 1
const LIMIT_EMPTY_BOTTLES = 4
const MAX_COUNT_LEVELS = 15
const MAX_TYPE_BOTTLE = 3

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
  levels: [],
  idTypeContourBottle: 1,
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
    setIdTypeContourBottle(state, action: PayloadAction<number>) {
      if (action.payload <= 0) {
        action.payload = 1
      }
      if (action.payload > MAX_TYPE_BOTTLE) {
        action.payload = MAX_TYPE_BOTTLE
      }
      state.idTypeContourBottle = action.payload
    },
    updateLayersInBottle: state => {
      if (state.countColors !== state.countLayersInBottle) {
        state.countLayersInBottle = state.countColors
      }
      // state.minCountLayersInBottle = state.countColors
    },
    createLevels: state => {
      let countLevels = MAX_COUNT_LEVELS
      let level: Level = {
        countColors: INIT_COUNT_COLORS,
        countLayersInBottle: INIT_COUNT_LAYERS,
        countEmptyBottles: INIT_EMPTY_BOTTLES,
      }
      while (countLevels > 0) {
        if (countLevels === MAX_COUNT_LEVELS) {
          state.levels = [...state.levels, level]
        } else {
          if (level.countColors === level.countLayersInBottle) {
            level = {
              ...level,
              countLayersInBottle: level.countLayersInBottle + 1,
            }
          } else {
            level = { ...level, countColors: level.countColors + 1 }
          }
          if (countLevels < 8) {
            level = { ...level, countEmptyBottles: 3 }
          }
          if (countLevels < 5) {
            level = { ...level, countEmptyBottles: 4 }
          }
          state.levels = [...state.levels, level]
        }
        countLevels--
      }
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
  setIdTypeContourBottle,
  updateLayersInBottle,
  createLevels,
  resetLevel,
} = levelSlice.actions
export default levelSlice.reducer

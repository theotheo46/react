import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import FillTypeColor from '../../../components/Bottle/FillTypeColor'
import { InfoForRenderBottle } from '../../../pages/LevelPage/LevelPage'

export interface Level {
  countColors: number
  countLayersInBottle: number
  countEmptyBottles: number
}

export const LEVEL_INIT = {
  startColorsForRestart: 'level-restart-colors',
  arraySettingsBottles: 'level-array-settings-bottles',
  countColorNeedTransfuse: 'level-count-color-need-transfuse',
  selectedColor: 'level-selected-color',
  countColors: 'level-count-colors',
  countLayersInBottle: 'level-count-layers-in-bottle',
  countEmptyBottles: 'level-count-empty-bottles',
  levels: 'level-levels',
  idTypeContourBottle: 'level-id-type-contour-bottle',
}

interface LevelState {
  countColors: number
  countLayersInBottle: number
  countEmptyBottles: number
  startColorsForRestart: string[]
  arraySettingsBottles: string[]
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
  startColorsForRestart: JSON.parse(
    localStorage.getItem(LEVEL_INIT.startColorsForRestart) || '[]'
  ),
  arraySettingsBottles: JSON.parse(
    localStorage.getItem(LEVEL_INIT.arraySettingsBottles) || '[]'
  ),
  selectedKeyBottle: '-1',
  countColorNeedTransfuse:
    Number(localStorage.getItem(LEVEL_INIT.countColorNeedTransfuse)) || 1,
  selectedColor:
    localStorage.getItem(LEVEL_INIT.selectedColor) ||
    JSON.stringify(FillTypeColor.TypeEmptyColor),
  countColors:
    Number(localStorage.getItem(LEVEL_INIT.countColors)) || INIT_COUNT_COLORS,
  countLayersInBottle:
    Number(localStorage.getItem(LEVEL_INIT.countLayersInBottle)) ||
    INIT_COUNT_LAYERS,
  countEmptyBottles:
    Number(localStorage.getItem(LEVEL_INIT.countEmptyBottles)) ||
    INIT_EMPTY_BOTTLES,
  minCountColors: INIT_COUNT_COLORS,
  minCountLayersInBottle: INIT_COUNT_LAYERS,
  minCountEmptyBottles: MIN_EMPTY_BOTTLES,
  maxCountColors: LIMIT,
  maxCountLayersInBottle: LIMIT,
  maxCountEmptyBottles: LIMIT_EMPTY_BOTTLES,
  levels: JSON.parse(localStorage.getItem(LEVEL_INIT.levels) || '[]'),
  idTypeContourBottle:
    Number(localStorage.getItem(LEVEL_INIT.idTypeContourBottle)) || 1,
}

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setStartColorsForRestart: (state, action: PayloadAction<string[]>) => {
      state.startColorsForRestart = action.payload
      action.payload.length > 0
        ? localStorage.setItem(
            LEVEL_INIT.startColorsForRestart,
            JSON.stringify(action.payload)
          )
        : localStorage.removeItem(LEVEL_INIT.startColorsForRestart)
    },
    setArraySettingsBottles: (state, action: PayloadAction<string[]>) => {
      state.arraySettingsBottles = action.payload
      action.payload
        ? localStorage.setItem(
            LEVEL_INIT.arraySettingsBottles,
            JSON.stringify(action.payload)
          )
        : localStorage.removeItem(LEVEL_INIT.arraySettingsBottles)
    },
    setSelectedColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload
      JSON.parse(action.payload).id > 0
        ? localStorage.setItem(LEVEL_INIT.selectedColor, action.payload)
        : localStorage.removeItem(LEVEL_INIT.selectedColor)
    },
    setSelectedKeyBottle: (state, action: PayloadAction<string>) => {
      state.selectedKeyBottle = action.payload
    },
    setCountColorNeedTransfuse: (state, action: PayloadAction<number>) => {
      state.countColorNeedTransfuse = action.payload
      localStorage.setItem(
        LEVEL_INIT.countColorNeedTransfuse,
        JSON.stringify(action.payload)
      )
    },
    setCountColors: (state, action: PayloadAction<number>) => {
      state.countColors = action.payload
      localStorage.setItem(
        LEVEL_INIT.countColors,
        JSON.stringify(action.payload)
      )
    },
    setCountLayersInBottle: (state, action: PayloadAction<number>) => {
      state.countLayersInBottle = action.payload
      localStorage.setItem(
        LEVEL_INIT.countLayersInBottle,
        JSON.stringify(action.payload)
      )
    },
    setCountEmptyBottles: (state, action: PayloadAction<number>) => {
      state.countEmptyBottles = action.payload
      localStorage.setItem(
        LEVEL_INIT.countEmptyBottles,
        JSON.stringify(action.payload)
      )
    },
    setIdTypeContourBottle(state, action: PayloadAction<number>) {
      if (action.payload <= 0) {
        action.payload = MAX_TYPE_BOTTLE
      }
      if (action.payload > MAX_TYPE_BOTTLE) {
        action.payload = 1
      }
      state.idTypeContourBottle = action.payload
      localStorage.setItem(
        LEVEL_INIT.idTypeContourBottle,
        JSON.stringify(action.payload)
      )
    },
    updateLayersInBottle: state => {
      if (state.countColors !== state.countLayersInBottle) {
        state.countLayersInBottle = state.countColors
        localStorage.setItem(
          LEVEL_INIT.countLayersInBottle,
          JSON.stringify(state.countColors)
        )
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
          localStorage.setItem(
            LEVEL_INIT.levels,
            JSON.stringify([...state.levels, level])
          )
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
          localStorage.setItem(
            LEVEL_INIT.levels,
            JSON.stringify([...state.levels, level])
          )
        }
        countLevels--
      }
    },
    resetLevel: state => {
      localStorage.removeItem(LEVEL_INIT.countColors)
      localStorage.removeItem(LEVEL_INIT.countEmptyBottles)
      localStorage.removeItem(LEVEL_INIT.countLayersInBottle)
      state.countColors = INIT_COUNT_COLORS
      state.countEmptyBottles = INIT_EMPTY_BOTTLES
      state.countLayersInBottle = INIT_COUNT_LAYERS
    },
  },
})

export const {
  setStartColorsForRestart,
  setArraySettingsBottles,
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

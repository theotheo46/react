import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setCurrentAttempts,
  setCurrentLevel,
  setCurrentTime,
} from '../store/slices/gameSlice'
import {
  Level,
  resetLevel,
  setCountColors,
  setCountEmptyBottles,
  setCountLayersInBottle,
} from '../store/slices/levelSlice'

export const useNextLevel = () => {
  const { currentLevel } = useAppSelector(state => state.game)

  const { countColors, countLayersInBottle, levels } = useAppSelector(
    state => state.level
  )

  const dispatch = useAppDispatch()

  function setNextLevel() {
    updateLevelUp(currentLevel, countColors, countLayersInBottle, levels)
    dispatch(setCurrentTime(''))
    dispatch(setCurrentAttempts(0))
  }

  function updateLevelUp(
    currentLevel: number | null,
    countColors: number,
    countLayersInBottle: number,
    levels: Level[]
  ) {
    const { nextLevel, levelNumber } = getNextLevel(
      currentLevel,
      countColors,
      countLayersInBottle,
      levels
    )
    if (nextLevel !== undefined && typeof nextLevel !== 'number') {
      dispatch(setCountColors(nextLevel.countColors))
      dispatch(setCountLayersInBottle(nextLevel.countLayersInBottle))
      dispatch(setCountEmptyBottles(nextLevel.countEmptyBottles))
      dispatch(setCurrentLevel(levelNumber))
    } else {
      dispatch(resetLevel())
      dispatch(setCurrentLevel(1))
    }
  }

  function findNearLevelIndex(
    countColors: number,
    countLayersInBottle: number,
    levels: Level[]
  ) {
    let foundLevelIndex: number
    if (countColors === countLayersInBottle) {
      foundLevelIndex = levels.findIndex(
        level => level.countLayersInBottle === countLayersInBottle + 1
      )
    } else {
      foundLevelIndex = levels.findIndex(
        level => level.countColors === countColors + 1
      )
    }
    if (foundLevelIndex > -1) {
      return foundLevelIndex
    }
    return undefined
  }

  function getNextLevel(
    currentLevel: number | null,
    countColors: number,
    countLayersInBottle: number,
    levels: Level[]
  ) {
    let nextLevel: Level | undefined | number
    let levelNumber = 0
    if (currentLevel) {
      nextLevel = levels[currentLevel]
      levelNumber = currentLevel + 1
    } else {
      const index = findNearLevelIndex(countColors, countLayersInBottle, levels)
      if (index !== undefined) {
        nextLevel = levels[index]
        levelNumber = index + 1
      } else {
        nextLevel = index
      }
    }
    return { nextLevel, levelNumber }
  }
  return { setNextLevel }
}

import StartGameHeader from './StartGameHeader'
import StartGameImage from './StartGameImage'
import StartGameNav from './StartGameNav'
import './StartGame.pcss'
import LoaderGame from '../LoaderGame'
import { useStartLevel } from '../../../hooks/useStartLevel'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import SetupLevelGame from '../SetupLevelGame'
import { GameMode } from '../../../store/slices/gameSlice/types'
import {
  setIsSetupLevelSettings,
  setNextLevel,
  setMode,
} from '../../../store/slices/gameSlice'

const StartGame = () => {
  const { gameIsLoading, startGameHandler } = useStartLevel()
  const { mode, isSetupLevelSettings } = useAppSelector(state => state.game)

  const dispatch = useAppDispatch()

  function setupSettingsHandler(mode: GameMode) {
    dispatch(setMode(mode))
    dispatch(setIsSetupLevelSettings(true))
  }

  function cancelSettingsHandler() {
    dispatch(setMode(null))
    dispatch(setIsSetupLevelSettings(false))
  }

  return (
    <div className="start-game">
      {gameIsLoading ? (
        <LoaderGame />
      ) : mode && isSetupLevelSettings ? (
        <SetupLevelGame
          onCancelSettings={cancelSettingsHandler}
          onStart={() => {
            dispatch(setIsSetupLevelSettings(false))
            dispatch(setNextLevel())
            startGameHandler()
          }}
        />
      ) : (
        <>
          <StartGameHeader />
          <StartGameImage />
          <StartGameNav onSetupSettings={setupSettingsHandler} />
        </>
      )}
    </div>
  )
}

export default StartGame

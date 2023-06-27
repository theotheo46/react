import StartGame from '../components/Game/StartGame'
import { useAppSelector } from '../store/hooks'

const StartPage = () => {
  const { isSetupLevelSettings } = useAppSelector(state => state.game)
  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className={`container ${isSetupLevelSettings && 'no-background'}`}>
        <StartGame />
      </main>
    </div>
  )
}

export default StartPage

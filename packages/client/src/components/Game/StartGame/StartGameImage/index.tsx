import bottles from '../../../../assets/images/game-preview.png'
import { useAppSelector } from '../../../../store/hooks'
import './StartGameImage.pcss'

const StartGameImage = () => {
  const { theme } = useAppSelector(state => state.user)
  return (
    <div className="start-game-image">
      <img
        src={bottles}
        alt="bottles game preview"
        style={
          theme === 'dark'
            ? { filter: 'brightness(80%)' }
            : { filter: 'brightness(100%)' }
        }
      />
    </div>
  )
}

export default StartGameImage

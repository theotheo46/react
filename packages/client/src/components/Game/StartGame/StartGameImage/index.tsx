import bottles from '../../../../assets/images/game-preview.png'
import './StartGameImage.pcss'

const StartGameImage = () => {
  return (
    <div className="start-game-image">
      <img src={bottles} alt="bottles game preview" />
    </div>
  )
}

export default StartGameImage

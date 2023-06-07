import FinishGame from '../components/Game/FinishGame'
import wave from '../assets/images/wave.png'

const FinishPage = () => {
  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className="container">
        <FinishGame />
      </main>
      <img className="page-wrap__wave" src={wave} alt="wave" />
    </div>
  )
}

export default FinishPage

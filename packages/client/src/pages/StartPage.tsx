import StartGame from '../components/Game/StartGame'
import wave from '../assets/images/wave_v.svg'

const StartPage = () => {
  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className="container">
        <StartGame />
      </main>
      <img className="page-wrap__wave wave-bg" src={wave} alt="wave" />
    </div>
  )
}

export default StartPage

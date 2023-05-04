import StartGame from '../components/Game/StartGame'

const StartPage = () => {
  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className="container">
        <StartGame />
      </main>
      <img className="page-wrap__wave" src="wave.png" alt="wave" />
    </div>
  )
}

export default StartPage

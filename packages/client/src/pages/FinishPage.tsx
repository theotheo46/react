import FinishGame from '../components/Game/FinishGame'

const FinishPage = () => {
  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className="container">
        <FinishGame />
      </main>
      <img className="page-wrap__wave" src="wave.png" alt="wave" />
    </div>
  )
}

export default FinishPage

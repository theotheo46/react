import { useEffect } from 'react'
import './styles/App.pcss'
import Button from './components/Button'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <h2>Вот тут будет жить ваше приложение :)</h2>
      <Button styleType="primary" width="320px">
        Кнопка
      </Button>
    </div>
  )
}

export default App

import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import DevFooter, { DevFooterElement } from '../../components/DevFooter'
import Memo from '../../components/Memo'
import './MiniLendingPage.pcss'

const MiniLendingPage = () => {
  const devFooterElementArray: DevFooterElement[] = [
    {
      devName: 'Дмитрий Козицкий',
      devMail: 'theotheo46@gmail.com',
      devAvatar: 'dmitry.png'
    },
    {
      devName: 'Артем Журавлев',
      devMail: 'an3wer@yandex.ru',
      devAvatar: 'artem.png'
    },
    {
      devName: 'Илья Орехов',
      devMail: 'ily4-andreevi4@yandex.ru',
      devAvatar: 'ilya.png'
    },
    {
      devName: 'Ксения Тюленева',
      devMail: 'deiantydj@yandex.ru',
      devAvatar: 'kseniya.png'
    }
  ]
  const navigate = useNavigate()

  return (
    <div className="mini-lending-page">
      <div className="first-screen">
        <p className="header">Water Puzzle</p>
        <Memo
          className="memo"
          header=""
          text="Увлекательная и сложная игра, которая проверяет ваши навыки сопоставления цветов и решения головоломок. Игра представляет игрокам сетку бутылок, заполненных жидкостями разного цвета, которые необходимо рассортировать"
          rws={4}
          cls={80}
        />
        <Button
          onClick={() => navigate('/start')}
          type="submit"
          width="150px"
          height="48px">
          Начать игру
        </Button>
        <img
          className="game-screen-image"
          src={'minilending.svg'}
          alt={`avatar for game main screen`}
        />
      </div>
      <div className="second-screen">
        <div className="memo-container">
          <Memo
            className="memo"
            header="Концепция"
            text="По мере прохождения уровней головоломки усложняются, увеличивается количество бутылок и комбинаций цветов. Игрокам необходимо разрабатывать стратегию и тщательно планировать свои действия, чтобы не застрять и не смешать не те цвета. Игра также может включать задачи на время или ограниченные ходы, чтобы добавить дополнительный уровень сложности."
            rws={10}
            cls={60}
          />
          <Memo
            className="memo"
            header="Игровые механики"
            text="Механика игры заключается в сортировке жидкостей в бутылках путем переливания их из одной бутылки в другую, достижения цели - разделить их по цвету. Игроки могут переливать жидкости из одной бутылки в другую, только если в принимающей бутылке достаточно места и переливаемые жидкости имеют одинаковый цвет. Задача состоит в том, чтобы найти правильную последовательность ходов для успешного разделения всех жидкостей по цветам."
            rws={10}
            cls={60}
          />
        </div>
        <DevFooter
          className="dev-footer"
          devFooterElementArray={devFooterElementArray}
        />
      </div>
      <img className="mini-lending-page-wave" src="wave.png" alt="wave" />
    </div>
  )
}

export default MiniLendingPage

import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import type { DevFooterElement } from '../../components/DevFooter'
import './MiniLendingPage.pcss'
import { useAppSelector } from '../../store/hooks'
import artemAvatar from '../../assets/images/artem.png'
import iliyaAvatar from '../../assets/images/ilya.png'
import kseniyaAvatar from '../../assets/images/kseniya.png'
import dmitryAvatar from '../../assets/images/dmitry.png'
import previewDark from '../../assets/images/landing_dark.png'
import previewLight from '../../assets/images/landing_light.png'

const MiniLendingPage = () => {
  const { user } = useAppSelector(state => state.user)
  const isAuth = !!user
  const devFooterElementArray: DevFooterElement[] = [
    {
      devName: 'Дмитрий Козицкий',
      devMail: 'theotheo46@gmail.com',
      devAvatar: dmitryAvatar,
    },
    {
      devName: 'Артем Журавлев',
      devMail: 'an3wer@yandex.ru',
      devAvatar: artemAvatar,
    },
    {
      devName: 'Илья Орехов',
      devMail: 'ily4-andreevi4@yandex.ru',
      devAvatar: iliyaAvatar,
    },
    {
      devName: 'Ксения Тюленева',
      devMail: 'deiantydj@yandex.ru',
      devAvatar: kseniyaAvatar,
    },
  ]
  const navigate = useNavigate()
  const { theme } = useAppSelector(state => state.user)
  return (
    <main className="page-wrap page-wrap_lightblue">
      <div className="landing container">
        <div className="landing__intro intro">
          <h1 className="intro__title">Water Puzzle</h1>
          <div className="intro__text">
            <p>
              Увлекательная и сложная игра, которая проверяет ваши навыки
              сопоставления цветов и решения головоломок. Игра представляет
              игрокам сетку бутылок, заполненных жидкостями разного цвета,
              которые необходимо рассортировать.
            </p>
          </div>
          <div className="intro__btn">
            <Button
              onClick={() => navigate(isAuth ? '/start' : '/signin')}
              type="submit"
              width="150px"
              height="48px">
              Начать игру
            </Button>
          </div>
        </div>
        <div className="landing__preview">
          <img
            src={theme === 'light' ? previewLight : previewDark}
            alt="game preview"
          />
        </div>
        <div className="landing__about">
          <div className="card card_row">
            <div className="card__header">
              <h2>Концепция</h2>
            </div>
            <div className="card__body">
              <p>
                По мере прохождения уровней головоломки усложняются,
                увеличивается количество бутылок и комбинаций цветов. Игрокам
                необходимо разрабатывать стратегию и тщательно планировать свои
                действия, чтобы не застрять и не смешать не те цвета. Игра также
                может включать задачи на время или ограниченные ходы, чтобы
                добавить дополнительный уровень сложности.
              </p>
            </div>
          </div>
          <div className="card card_row">
            <div className="card__header">
              <h2>Игровые механики</h2>
            </div>
            <div className="card__body">
              <p>
                Механика игры заключается в сортировке жидкостей в бутылках
                путем переливания их из одной бутылки в другую, достижения цели
                - разделить их по цвету. Игроки могут переливать жидкости из
                одной бутылки в другую, только если в принимающей бутылке
                достаточно места и переливаемые жидкости имеют одинаковый цвет.
                Задача состоит в том, чтобы найти правильную последовательность
                ходов для успешного разделения всех жидкостей по цветам.
              </p>
            </div>
          </div>
        </div>
        <div className="landing__footer footer">
          <div className="card card_row">
            <div className="card__header">
              <h2>Разработчики</h2>
            </div>
            <div className="card__body">
              <div className="footer__row">
                {devFooterElementArray.map(item => {
                  return (
                    <div
                      key={item.devName}
                      className="footer__item footer-item">
                      <div className="footer-item__avatar">
                        <img
                          src={item.devAvatar}
                          alt={`avatar-${item.devName}`}
                        />
                      </div>
                      <div className="footer-item__body">
                        <div className="footer-item__name">{item.devName}</div>
                        <div className="footer-item__contact">
                          {item.devMail}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <img className="page-wrap__wave wave-bg" src={wave} alt="wave" /> */}
    </main>
  )
}

export default MiniLendingPage

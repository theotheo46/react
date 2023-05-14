import { Route, Routes } from 'react-router-dom'
import Layout from '../layouts/Layout'
import ProfilePage from '../pages/ProfilePage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import ForumPage from '../pages/Forum/ForumPage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import LeaderbordPage from '../pages/LeaderbordPage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import MiniLendingPage from '../pages/MiniLendingPage/MiniLendingPage'
import StartPage from '../pages/StartPage'
import LevelPage from '../pages/LevelPage/LevelPage'
import ForumSectionPage from '../pages/Forum/ForumSectionPage'
import ForumTopicPage from '../pages/Forum/ForumTopicPage'
import FinishPage from '../pages/FinishPage'

const RoutesBase = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/forum"
          element={<ForumPage className="forum-page" title="Форум игры" />}
        />
        <Route
          path="/forumsection"
          element={
            <ForumSectionPage
              className="forum-page"
              title="Темы"
              name="Раздел1"
              user="Дмитрий Козицкий"
              timestamp="12:05:47 22/04/2023"
            />
          }
        />
        <Route
          path="/forumtopic"
          element={
            <ForumTopicPage
              className="forum-topic-page"
              title="Сообщения"
              name="Тема1"
              user="Дмитрий Козицкий"
              timestamp="12:05:47 22/04/2023"
            />
          }
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/leaderbord" element={<LeaderbordPage />} />
        <Route path="/level" element={<LevelPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route
          path="/error400"
          element={
            <ErrorPage
              errorCode="404"
              errorText="К сожалению, запрашиваемая страница не найдена"
              errorStatus="Some status"
            />
          }
        />
        <Route
          path="/error500"
          element={
            <ErrorPage
              errorCode="500"
              errorText="Внутренняя ошибка сервера. Мы о ней знаем и скоро исправим!"
              errorStatus="Some status"
            />
          }
        />
        <Route path="/minilending" element={<MiniLendingPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
export default RoutesBase

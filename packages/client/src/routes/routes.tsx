import { Route, Routes } from 'react-router-dom'
import Layout from '../layouts/Layout'
import ProfilePage from '../pages/ProfilePage'
import ForumPage from '../pages/Forum/ForumPage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import LeaderboardPage from '../pages/LeaderboardPage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import MiniLendingPage from '../pages/MiniLendingPage/MiniLendingPage'
import StartPage from '../pages/StartPage'
import LevelPage from '../pages/LevelPage/LevelPage'
import ForumSectionPage from '../pages/Forum/ForumSectionPage'
import ForumTopicPage from '../pages/Forum/ForumTopicPage'
import FinishPage from '../pages/FinishPage'
import { AppDispatch } from '../store'
import { getUser } from '../store/slices/userSlice/userAsyncThunks'

export const mainRoute = [
  {
    path: '/',
    element: Layout,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
]
const RoutesBase = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
        loader={() => (dispatch: AppDispatch) => {
          return dispatch(getUser())
        }}>
        <Route index element={<MiniLendingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forumsection/:id" element={<ForumSectionPage />} />
        <Route path="/forumtopic/:id" element={<ForumTopicPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
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
      </Route>
      <Route
        path="*"
        element={
          <ErrorPage
            errorCode="404"
            errorText="К сожалению, запрашиваемая страница не найдена"
            errorStatus="Some status"
          />
        }
      />
    </Routes>
  )
}
export default RoutesBase

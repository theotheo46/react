import { Route, Routes } from "react-router-dom"
import Layout from "../layouts/Layout"
import ProfilePage from "../pages/ProfilePage"
import HomePage from "../pages/HomePage"
import NotFoundPage from "../pages/NotFoundPage"
import ForumPage from "../pages/ForumPage"
import SignInPage from "../pages/SignInPage"
import SignUpPage from "../pages/SignUpPage"
import LeaderbordPage from "../pages/LeaderbordPage"
import ErrorPage from "../pages/ErrorPage"

const RoutesBase: React.FC = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/forum' element={<ForumPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/singup' element={<SignUpPage />} />
          <Route path='/leaderbord' element={<LeaderbordPage />} />
          <Route path='/error400' element={<ErrorPage errorText="Ошибка в обработке запроса на сервере" errorStatus="Some status"/>} />
          <Route path='/error500' element={<ErrorPage errorText="Ошибка на сервере" errorStatus="Some status"/>} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default RoutesBase

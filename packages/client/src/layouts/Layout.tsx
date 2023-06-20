import { Outlet } from 'react-router-dom'
import ThemeSelector from '../components/ThemeSelector'

const Layout = () => {
  return (
    <>
      <Outlet />
      <ThemeSelector />
    </>
  )
}

export default Layout

import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.pcss'

const Navigation: React.FC = () => {
  const navs = [
    {
      path: '/',
      title: 'Home',
    },
    {
      path: '/profile',
      title: 'Profile',
    },
    {
      path: '/forum',
      title: 'Forum',
    },
    {
      path: '/signin',
      title: 'Sign in',
    },
    {
      path: '/singup',
      title: 'Sign up',
    },
    {
      path: '/leaderbord',
      title: 'Leaderbord',
    },
  ]

  return (
    <nav className={styles.nav}>
      <ul>
        {navs.map((item) => (
          <li key={item.title}>
            <NavLink to={item.path}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

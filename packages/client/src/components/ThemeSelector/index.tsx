import { useTheme } from '../../hooks/useTheme'
import { useAppSelector } from '../../store/hooks'
import './ThemeSelector.pcss'
import { FaSun, FaMoon } from 'react-icons/fa'

const ThemeSelector = () => {
  const { theme, user } = useAppSelector(state => state.user)

  const { setUserTheme } = useTheme()

  return (
    <div className="theme-selector">
      <button
        onClick={async () => await setUserTheme('light', user?.id)}
        className={
          theme === 'light'
            ? 'theme-selector__btn theme-selector__btn_active'
            : 'theme-selector__btn'
        }>
        <FaSun size="14px" />
      </button>
      <button
        onClick={async () => await setUserTheme('dark', user?.id)}
        className={
          theme === 'dark'
            ? 'theme-selector__btn theme-selector__btn_active'
            : 'theme-selector__btn'
        }>
        <FaMoon size="14px" />
      </button>
    </div>
  )
}

export default ThemeSelector

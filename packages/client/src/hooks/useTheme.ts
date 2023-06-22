import { useAppDispatch } from '../store/hooks'
import { UserThemes } from '../store/slices/userSlice/types'
import { getTheme, setTheme } from '../store/slices/userSlice/userAsyncThunks'
import { getThemeFromLS, setThemeToLS } from '../store/slices/userSlice'

export const useTheme = () => {
  const dispatch = useAppDispatch()

  async function getUserTheme(id?: number) {
    if (id) {
      const res = await dispatch(getTheme({ userId: id }))
      if (getTheme.rejected.match(res)) {
        await dispatch(setTheme({ userId: id, theme: 'light' }))
      }
    } else {
      dispatch(getThemeFromLS())
    }
  }

  async function setUserTheme(theme: UserThemes, id?: number) {
    if (id) {
      await dispatch(setTheme({ userId: id, theme }))
    } else {
      dispatch(setThemeToLS(theme))
    }
  }

  return { getUserTheme, setUserTheme }
}

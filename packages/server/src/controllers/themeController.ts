import AppTheme from '../models/AppTheme'
import UserTheme from '../models/UserTheme'

export type SetOrUpdateDataParam = {
  userId: number
  theme: string
}

class ThemeController {
  async getUserTheme(id: number) {
    const userTheme = await UserTheme.findOne({ where: { ownerId: id } })
    const theme = await AppTheme.findOne({
      where: { themeId: userTheme?.themeId },
    })
    return { ...userTheme?.dataValues, ...theme?.dataValues }
  }

  async setTheme(data: SetOrUpdateDataParam) {
    let result
    const userTheme = await UserTheme.findOne({
      where: { ownerId: data.userId },
    })
    const theme = await AppTheme.findOne({ where: { theme: data.theme } })

    if (userTheme) {
      theme?.themeId
        ? (userTheme.themeId = theme.themeId)
        : (userTheme.themeId = 1)
      result = await userTheme.save()
    } else {
      result = await UserTheme.create({
        ownerId: data.userId,
        themeId: theme?.themeId ? theme.themeId : 1,
      })
    }
    return { ...result.dataValues, ...theme?.dataValues }
  }

  async initThemes() {
    await AppTheme.bulkCreate([{ theme: 'light' }, { theme: 'dark' }])
  }
}

export default new ThemeController()

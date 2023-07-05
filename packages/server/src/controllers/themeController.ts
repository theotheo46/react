import AppTheme from '../models/AppTheme'
import UserTheme from '../models/UserTheme'

export type SetOrUpdateDataParam = {
  userId: number
  theme: string
}

class ThemeController {
  async getUserTheme(id: number) {
    const userTheme = await UserTheme.findOne({
      where: { ownerId: id },
    })
    /*
      По какой-то причине не сработало объединение таблиц, хотя @ForeignKey в таблице UserTheme прописан
      Поэтому использую второй запрос await AppTheme.findOne, чтобы получить строковое значение
      Причем проверил sql запрос в самой базе, запрос работает - 
      SELECT * FROM "public"."user_theme" JOIN "public"."app_theme" ON "public"."app_theme"."theme_id" = "public"."user_theme"."theme_id" WHERE "owner_id" = <some id>
    */
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

    if (!theme) {
      await this.initThemes()
    }

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

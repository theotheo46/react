import { Router, Request, Response } from 'express'
import themeController from '../controllers/themeController'
import type { SetOrUpdateDataParam } from '../controllers/themeController'

export const themeRouter = Router()

themeRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id: userId } = req.params
    const theme = await themeController.getUserTheme(+userId)
    if (!theme) {
      throw new Error('Theme not found')
    }
    res.send(theme)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})

themeRouter.post(
  '/',
  async (
    req: Request<unknown, unknown, SetOrUpdateDataParam>,
    res: Response
  ) => {
    try {
      const { userId, theme } = req.body
      const result = await themeController.setTheme({ userId, theme })
      res.send(result)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }
)

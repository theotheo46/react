import { Router, Request, Response } from 'express'
import emojiController from '../controllers/emojiController'

export const emoji = Router()

emoji.get('/', async (req: Request<{ id: string }>, res: Response) => {
  console.log('Req body', req.body)
  try {
    const emoji = await emojiController.getAllEmoji()
    if (!emoji) {
      throw new Error('Emoji not found')
    }
    res.send(emoji)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})

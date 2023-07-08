import { Router } from 'express'
import { YandexApi } from '../api/yandexApi'

export const auth = Router()

auth.get('/user', async (req, res) => {
  console.log('cookie form auth:', req.headers['cookie'])

  try {
    const user = await new YandexApi(req.headers['cookie'])
    return res.status(201).json(user)
  } catch (err) {
    return res.status(400).json({ err })
  }
})

auth.get('/test', (_, res) => {
  res.json('Echo from Auth')
})

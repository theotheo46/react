import { Router } from 'express'
import { Leaderboard } from '../models/Leaderboard'

export const lb = Router()

lb.post('/setleader', async (req, res, next) => {
  try {
    const leader = await Leaderboard.create(req.body)
    res.status(201).json(leader)
  } catch (e) {
    next(e)
  }
})

lb.get('/test', (_, res) => {
  res.json('Echo from Leaderboard')
})

import { Router } from 'express'
import { YandexApi } from '../api/yandexApi'

export const auth = Router()

// auth.post('/setleader', async (req, res) => {
//   //BODY {"userId":"12345","usernick":"theo","level":"15","steps":"49","time":"120","score":""}
//   req.body.score = getScore(+req.body.level, +req.body.steps, +req.body.time)
//   console.log(req.body)
//   Leaderboard.create(req.body)
//     .then(leader => {
//       return res.status(201).json(leader)
//     })
//     .catch(err => {
//       return res.status(400).json({ err })
//     })
// })

auth.get('/user', async (req, res) => {
  //
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

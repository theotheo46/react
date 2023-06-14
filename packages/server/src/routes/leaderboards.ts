import { Router } from 'express'
import { Leaderboard } from '../models/Leaderboard'

export const lb = Router()

const getScore = (level : number, steps: number, time: number) : number => {
  return Math.round(level / (time + steps * 5) * 100000)
}

lb.post('/setleader', async (req, res) => {
    req.body.score = getScore(+req.body.level, +req.body.steps, +req.body.time)
    console.log(req.body)
    Leaderboard.create(req.body)
    .then((leader)=>{
      return res.status(201).json(leader)
    })
    .catch(err => {
      return res.status(400).json({err})
    })
})


lb.get('/gettopleaders', async (req, res) => {
    let number = req.query.number;
    if (number===undefined) number = "10"
    Leaderboard.findAll({
      order: [
        ["score", "DESC"],
        ["usernick", "ASC"],
      ],
      limit: +number!
    })
    .then((leaders)=>{
      return res.status(201).json(leaders)
    })
    .catch(err => {
      return res.status(400).json({err})
    })
})

lb.get('/test', (_, res) => {
  res.json('Echo from Leaderboard')
})

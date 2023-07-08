// import { Router } from 'express'

// export const user = Router()

// //Надо будет добавить весовые коэффициенты для параметра level так, чтобы более высокие уровни давали скор выше чем для низких
// const getScore = (level: number, steps: number, time: number): number => {
//   return Math.round((level / (time + steps * 5)) * 100000)
// }

// user.post('/setleader', async (req, res) => {
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

// user.get('/gettopleaders', async (req, res) => {
//   let number = req.query.number
//   if (number === undefined) number = '10'
//   Leaderboard.findAll({
//     order: [
//       ['score', 'DESC'],
//       ['usernick', 'ASC'],
//     ],
//     limit: +number!,
//   })
//     .then(leaders => {
//       return res.status(201).json(leaders)
//     })
//     .catch(err => {
//       return res.status(400).json({ err })
//     })
// })

// user.get('/test', (_, res) => {
//   res.json('Echo from user')
// })

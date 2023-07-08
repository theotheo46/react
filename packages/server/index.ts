import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { sequelize } from './sequelize'
import { lb } from './src/routes/leaderboards'
import { forum } from './src/routes/forum'
import { emoji } from './src/routes/emoji'
import { themeRouter } from './src/routes/themeRoutes'
import ssrMiddleware from './src/middleware/ssr.middleware'
import themeController from './src/controllers/themeController'
import emojiController from './src/controllers/emojiController'

dotenv.config()

import express from 'express'
import * as path from 'path'
// import { auth } from './src/routes/auth'

export const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())

  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined

  const srcPath = path.dirname(require.resolve('client'))
  let distPath = ''
  let ssrClientPath = ''

  if (!isDev()) {
    distPath = path.dirname(require.resolve('client/dist/index.html'))
    ssrClientPath = require.resolve('client/dist-ssr/client.cjs')
  }

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  if (isDev()) {
    await sequelize.sync({ force: true })
    await themeController.initThemes()
    // await emojiController.initEmoji()
    // await sequelize.sync()
  } else {
    await sequelize.sync()
  }
  await emojiController.initEmoji()

  try {
    await sequelize.authenticate()
    console.log('Connection to DB has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the DB:', error)
  }
  // app.use('/auth', auth)

  // app.use('*', cookieParser(), await authMiddleware())

  app.use(express.json())

  app.use('/leaderboard', lb)
  app.use('/emoji', emoji)
  app.use('/forum', forum)
  app.use('/api/theme', themeRouter)
  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use(express.static(path.resolve(distPath)))
  }

  app.use('*', ssrMiddleware({ vite, srcPath, distPath, ssrClientPath }))

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()

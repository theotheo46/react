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
import { expressCspHeader, INLINE, SELF } from 'express-csp-header'
import cookieParser from 'cookie-parser'
import * as path from 'path'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(
    cors(),
    expressCspHeader({
      directives: {
        'default-src': [SELF],
        'connect-src': ['*'],
        'script-src': [SELF, INLINE, 'https://ya-praktikum.tech'],
        'style-src': [SELF, INLINE, 'https://fonts.googleapis.com/'],
        'img-src': [SELF, 'data:', 'https://ya-praktikum.tech'],
        'font-src': [
          SELF,
          'https://fonts.googleapis.com/',
          'https://fonts.gstatic.com/',
        ],
      },
    })
  )
  // @ts-ignore
  app.use(cookieParser())

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

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  )

  if (isDev()) {
    await sequelize.sync({ force: true })
    await themeController.initThemes()
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

  app.use(express.json())

  app.use('/leaderboard', lb)
  app.use('/emoji', emoji)
  app.use('/forum', forum)
  app.use('/api/theme', themeRouter)
  app.get('/sw.js', (_, res) => {
    res.sendFile(path.resolve(distPath, 'sw.js'))
  })
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

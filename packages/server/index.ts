import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { sequelize } from './sequelize'
import { lb } from './src/routes/leaderboards'

dotenv.config()

import express from 'express'
import { promises as fs } from 'fs'
import * as path from 'path'

const isDev = () => process.env.NODE_ENV === 'development'

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

  const getStyles = async () => {
    try {
      const assetPath = path.join(distPath, 'assets')
      const files = await fs.readdir(assetPath)
      const cssAssets = files.filter(l => l.endsWith('.css'))
      const allContent = []
      for (const asset of cssAssets) {
        const content = await fs.readFile(path.join(assetPath, asset), 'utf-8')
        allContent.push(`<style type="text/css">${content}</style>`)
      }
      return allContent.join('\n')
    } catch {
      return ''
    }
  }

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }
  //await sequelize.sync({force: true});
  await sequelize.sync()
  try {
    await sequelize.authenticate()
    console.log('Connection to DB has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the DB:', error)
  }

  app.use(express.json())

  app.use('/leaderboard', lb)

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = await fs.readFile(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = await fs.readFile(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        )

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: ({ path }: { path: string }) => Promise<[string, any]>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (
          await vite!.ssrLoadModule(path.resolve(srcPath, '/src/ssr.tsx'))
        ).render
      }

      const styles = getStyles()
      const cssAssets = isDev() ? await styles : ''

      const [appHtml, store] = await render({ path: url })
      const data =
        '<script>' +
        'window.__INITIAL_STATE__=' +
        JSON.stringify(store.getState()) +
        '</script>'

      const html = template
        .replace(`<!--ssr-styles-->`, cssAssets)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--ssr-state-->`, data)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()

import type { ViteDevServer } from 'vite'
import type { Request, Response, NextFunction } from 'express'
import * as path from 'path'
import { promises as fs } from 'fs'
import { isDev } from '../../index'
import { YandexAPIRepository } from '../api/YandexAPIRepository'

interface Params {
  vite: ViteDevServer | undefined
  srcPath: string
  distPath: string
  ssrClientPath: string
}

const getStyles = async (distPath: string) => {
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

const ssrMiddleware = ({ vite, srcPath, distPath, ssrClientPath }: Params) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
        if (vite) {
          template = await vite.transformIndexHtml(url, template)
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let render: ({
        path,
        repository,
      }: {
        path: string
        repository: YandexAPIRepository
      }) => Promise<[string, any]>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          (await vite!.ssrLoadModule(path.resolve(srcPath, '/src/ssr.tsx')))
            .render
      }

      const styles = getStyles(distPath)
      const cssAssets = isDev() ? await styles : ''
      const yandexApiRepo = new YandexAPIRepository(req.headers['cookie'])
      const [appHtml, store] = await render({
        path: url,
        repository: yandexApiRepo,
      })

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
      if (isDev() && vite) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  }
}

export default ssrMiddleware

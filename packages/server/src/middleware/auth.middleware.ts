import { Response, Request, NextFunction } from 'express'
import { YandexApi } from '../api/yandexApi'

export type RouteType = 'protected' | 'logined' | 'opened'

const ROUTES = {
  protected: [
    '/profile',
    '/forum',
    '/leaderboard',
    '/forumsection',
    '/forumtopic',
  ],
  logined: ['/signin', '/signup'],
}

export const getRouteType = (route: string): RouteType => {
  if (ROUTES.protected.some(str => route.startsWith(str))) {
    return 'protected'
  } else if (ROUTES.logined.some(str => route.startsWith(str))) {
    return 'logined'
  } else {
    return 'opened'
  }
}

const authMiddleware = async () => {
  return async (req: Request, _: Response, next: NextFunction) => {
    const url = req.originalUrl
    console.log('cookie: ', req.headers['cookie'])

    const user = await new YandexApi(req.headers['cookie']).getCurrent()

    console.log(`user: ${JSON.stringify(user)}`)
    const typeRoute = getRouteType(url)
    switch (typeRoute) {
      case 'protected':
        console.log(`  ➜ 🛡️'protected route'`)
        break
      case 'logined':
        console.log(`  ➜ 🚪🚶'entry route'`)
        break
      case 'opened':
        console.log(`  ➜ 🔓'opened route'`)
    }
    console.log(url)
    next()
  }
}
export default authMiddleware

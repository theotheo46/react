import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { Provider } from 'react-redux'
import { create } from './store'
import 'path2d-polyfill'
import { UserService } from './api/UserService'
import { matchPath } from 'react-router-dom'
import { mainRoute } from './routes/routes'

interface Props {
  path: string
  repository: any
}

export const render = async ({ path, repository }: Props) => {
  const [pathname] = path.split('?')
  const store = create(new UserService(repository))
  const currentRoute = mainRoute.find(route => matchPath(pathname, route.path))
  if (currentRoute) {
    const { loader } = currentRoute
    if (loader) {
      await loader(store.dispatch)
    }
  }
  const resultRender = renderToString(
    <Provider store={store}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </Provider>
  )
  /*
    Функция помимо html, возвразает еще store, чтобы в сервере можно было прокинуть состояние в разметку для инициализации стора на клиенте
  */
  return [resultRender, store]
}

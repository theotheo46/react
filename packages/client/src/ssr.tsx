import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { Provider } from 'react-redux'
import { create } from './store'
import 'path2d-polyfill'

interface Props {
  path: string
}

export const render = ({ path }: Props) => {
  const store = create()
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

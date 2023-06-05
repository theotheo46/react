import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { Provider } from 'react-redux'
import { create } from './store'

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
  return [resultRender]
}

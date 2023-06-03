import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './src/App'

interface Props {
  path: string
}

export const render = ({ path }: Props) => {
  const resultRender = renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  )
  return [resultRender]
}

import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.pcss'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { Provider } from 'react-redux'
import 'path2d-polyfill'
import { create } from './store/index'

declare global {
  interface Window {
    __INITIAL_STATE__: object
  }
}

const initialState = window.__INITIAL_STATE__
// @ts-ignore
delete window.__INITIAL_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <Provider store={create(initialState)}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
)

if (import.meta.env.PROD && typeof window !== 'undefined') {
  window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      try {
        const reg = navigator.serviceWorker.register('/sw.js', {
          type: 'module',
        })
        console.log('service worker register success:', reg)
      } catch (e) {
        console.error('service worker register fail', e)
      }
    }
  })
}

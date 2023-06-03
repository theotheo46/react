import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.pcss'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { Provider } from 'react-redux'
import store from './store'
import 'path2d-polyfill'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)

if (import.meta.env.PROD) {
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

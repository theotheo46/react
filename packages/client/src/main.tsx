import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.pcss'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </UserProvider>
  </BrowserRouter>
  // </React.StrictMode>
)

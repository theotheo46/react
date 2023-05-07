import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <>
      <h1>404 Error page</h1>
      <Link to="/">Go home</Link>
    </>
  )
}

export default NotFoundPage

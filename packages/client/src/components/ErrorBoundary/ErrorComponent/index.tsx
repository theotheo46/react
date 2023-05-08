import Button from '../../Button'
import './ErrorComponent.pcss'

interface Props {
  message: string
}

const ErrorComponent = ({ message }: Props) => {
  return (
    <div className="page-wrap page-wrap_blue">
      <div className="error-component">
        <h1 className="page-title error-component__title">
          На странице произошла ошибка
        </h1>
        <p className="error-component__message">{message}</p>
        <Button onClick={() => window.location.replace('/')}>На главную</Button>
      </div>
    </div>
  )
}

export default ErrorComponent

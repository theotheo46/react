import Button from '../../components/Button'
import ErrorInformer, {
  ErrorInformerProps,
} from '../../components/ErrorInformer'
import './ErrorPage.pcss'

const ErrorPage: React.FC<ErrorInformerProps> = ({
  errorCode,
  errorText,
  errorStatus,
}) => {
  return (
    <div className="error-page">
      <ErrorInformer
        className="error-informer"
        errorCode={errorCode}
        errorText={errorText}
        errorStatus={errorStatus}
      />
      <Button type="submit" width="150px" height="48px">
        На главную
      </Button>
    </div>
  )
}

export default ErrorPage

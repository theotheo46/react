import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import ErrorInformer, {
  ErrorInformerProps,
} from '../../components/ErrorInformer'
import './ErrorPage.pcss'
import wave from '../../assets/images/wave.png'

const ErrorPage: React.FC<ErrorInformerProps> = ({
  errorCode,
  errorText,
  errorStatus,
}) => {
  const navigate = useNavigate()

  return (
    <div className="error-page">
      <ErrorInformer
        className="error-informer"
        errorCode={errorCode}
        errorText={errorText}
        errorStatus={errorStatus}
      />
      <Button
        onClick={() => navigate('/')}
        type="submit"
        width="150px"
        height="48px">
        На главную
      </Button>
      <img className="error-page-wave" src={wave} alt="wave" />
    </div>
  )
}

export default ErrorPage

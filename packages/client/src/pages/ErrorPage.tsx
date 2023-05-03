import ErrorInformer from '../components/ErrorInformer'

interface Props {
  errorText: string
  errorStatus: string
}

const ErrorPage = ({ errorText, errorStatus }: Props) => {
  return (
    <>
      <h1>Error page</h1>
      <ErrorInformer errorText={errorText} errorStatus={errorStatus} />
    </>
  )
}

export default ErrorPage

import ErrorInformer from "../components/ErrorInformer"

interface ErrorProps
  {
  errorText: string
  errorStatus: string
}

const ErrorPage: React.FC<ErrorProps> = ({
  errorText,
  errorStatus
}

) => {
  return (
    <>
      <h1>Error page</h1>
      <ErrorInformer errorText={errorText} errorStatus={errorStatus}/>
    </>
  )
}

export default ErrorPage

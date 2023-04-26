import React from 'react'
import './ErrorInformer.pcss'

interface ErrorInformerProps
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  errorText: string
  errorStatus: string
}

const ErrorInformer: React.FC<ErrorInformerProps> = ({
  errorText,
  errorStatus,
  ...rest
}) => {


  return (
    <div
      className={'error-informer'}
      {...rest}>
        <div className="error-text">{errorText}</div>
        <div className="error-status">{errorStatus}</div>
    </div>
  )
}

export default ErrorInformer

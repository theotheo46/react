import React from 'react'
import './ErrorInformer.pcss'

export interface ErrorInformerProps
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  errorCode: string
  errorText: string
  errorStatus: string
  className?: string
}

const ErrorInformer: React.FC<ErrorInformerProps> = ({
  errorCode,
  errorText,
  errorStatus,
  className,
  ...rest
}) => {


  return (
    <div
      className={className}
      {...rest}>
        <div className={className + " error-code"}>{errorCode}</div>
        <div className={className + " error-text"}>{errorText}</div>
        <div className={className + " error-status"}>{errorStatus}</div>
    </div>
  )
}

export default ErrorInformer

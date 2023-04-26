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
      className={'errorinformer'}
      {...rest}>
        <div className="errorText">{errorText}</div>
        <div className="errorStatus">{errorStatus}</div>
    </div>
  )
}

export default ErrorInformer

import React from 'react'
import './Memo.pcss'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string
  header: string
  text: string
  rws: number
  cls: number
}

const Memo = ({ className, header, text, rws, cls, ...rest }: Props) => {
  return (
    <div className={className} {...rest}>
      <p className="header">{header}</p>
      <textarea className="text" readOnly rows={rws} cols={cls}>
        {text}
      </textarea>
    </div>
  )
}

export default Memo

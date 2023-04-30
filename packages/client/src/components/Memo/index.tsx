import React from 'react'
import './Memo.pcss'

interface MemoProps
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  header: string;
  text: string;
  rws: string;
  cls: string;
}

const Memo: React.FC<MemoProps> = ({
  className,
  header,
  text,
  rws,
  cls,
  ...rest
}) => {
  return (
    <div
      className={className}
      {...rest}>
      <p className="header">{header}</p>
      <textarea className="text" 
        readOnly
        rows={+rws}
        cols={+cls}
      >
        {text}
      </textarea>
    </div>
  )
}

export default Memo

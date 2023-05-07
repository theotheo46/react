import React from 'react'
import './ForumSection.pcss'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  name: string;
  user: string;
  timestamp: string;
  childrenElements: string[];
}

const ForumSection = ({className, name, user, timestamp, childrenElements}: Props) => {
  const sectionBody = childrenElements.join(",");
  return (
    <div
      className={className}>
      <div className={`${className}-header`}>
        <div className="header-left">{name}</div>
        <div className="header-right">
          <span>{`Автор: ${user}`}</span><span>{timestamp}</span>
        </div>
      </div>
      <div className={`${className}-body`}>
        {sectionBody}
      </div>
    </div>
  )
}

export default ForumSection



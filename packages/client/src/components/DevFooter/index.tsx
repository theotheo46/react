import React from 'react'
import './DevFooter.pcss'

export type DevFooterElement = {
  devName: string;
  devMail: string;
  devAvatar: string;
}

interface DevFooterProps
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  devFooterElementArray: DevFooterElement[];
}

const DevFooter: React.FC<DevFooterProps> = ({
  className,
  devFooterElementArray,
  ...rest
}) => {

  return (
    <div
      className={className}
      {...rest}>
      <div className={`${className}-header`}>Разработчики</div>
      <div className={`${className}-body`}>
          {devFooterElementArray.map((item, index) => (
            <div className="element" key={index}>
              <div className="devavatar">
                  <img src={item.devAvatar} alt={`avatar for ${item.devName}`}/>
              </div>
              <div className="dev-name-mail">
                <div className="devname">
                  {item.devName}
                </div>
                <div className="devmail">
                  {item.devMail}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DevFooter



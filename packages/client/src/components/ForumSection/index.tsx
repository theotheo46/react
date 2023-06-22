import React from 'react'
import './ForumSection.pcss'
import Button from '../Button'
import { useAppSelector } from '../../store/hooks'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string
  name: string
  userId: string | number
  user: string
  timestamp: string
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onDelete: (e: React.MouseEvent<Element, MouseEvent>) => void
  onRename: (e: React.MouseEvent<Element, MouseEvent>) => void
  childrenElements: string[]
}

const ForumSection = ({
  className,
  name,
  user,
  userId,
  timestamp,
  childrenElements,
  onClick,
  onDelete,
  onRename,
  ...props
}: Props) => {
  const { user: player } = useAppSelector(state => state.user)
  const sectionBody = childrenElements.join(' / ')
  const date = new Date(timestamp).toLocaleString()
  return (
    <div
      className={className}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      {...props}>
      <div className={`${className}-header`}>
        <div className="header-left">{name}</div>
        <div className="header-right">
          <span>{`Автор: ${user}`}</span>
          <span>{date}</span>
        </div>
      </div>
      <div className={`${className}-body`}>{sectionBody}</div>
      {userId === '2' && ( // TODO userId === player.id Проверка на то, что текущий пользователь - автор
        <div className={`${className}-buttons-block`}>
          <Button styleType="error" height="32px" onClick={onDelete}>
            Удалить
          </Button>
          <Button styleType="secondary" height="32px" onClick={onRename}>
            Переименовать
          </Button>
        </div>
      )}
    </div>
  )
}

export default ForumSection

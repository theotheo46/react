import { ReactNode, useEffect } from 'react'
import ModalOverlay from './ModalOverlay'
import './Modal.pcss'
import Button from '../Button'
import { FaTimes } from 'react-icons/fa'

interface Props {
  title: string
  children: ReactNode
  onClose: () => void
}

const Modal = ({ title, children, onClose }: Props) => {
  const iconTimesStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

  useEffect(() => {
    document.addEventListener('keydown', closeHandler)
    return () => {
      document.removeEventListener('keydown', closeHandler)
    }
  })

  function closeHandler(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="app-modal">
      <div className="app-modal__container">
        <div className="app-modal__content">
          <div className="app-modal__header">
            <h3>{title}</h3>
            <Button
              onClick={onClose}
              padding="8px"
              height="42px"
              styleType="tertiary"
              type="button">
              <FaTimes style={iconTimesStyle} />
            </Button>
          </div>
          <div className="app-modal__body">{children}</div>
        </div>
      </div>
      <ModalOverlay onClick={onClose} />
    </div>
  )
}

export default Modal

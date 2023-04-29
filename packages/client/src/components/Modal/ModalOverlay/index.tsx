import './ModalOverlay.pcss'

interface ModalOverlay {
  onClick: () => void
}

const ModalOverlay: React.FC<ModalOverlay> = ({ onClick }) => {
  return <div onClick={onClick} className="app-modal-overlay"></div>
}

export default ModalOverlay

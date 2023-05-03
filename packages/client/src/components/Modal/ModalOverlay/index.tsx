import './ModalOverlay.pcss'

interface Props {
  onClick: () => void
}

const ModalOverlay = ({ onClick }: Props) => {
  return <div onClick={onClick} className="app-modal-overlay"></div>
}

export default ModalOverlay

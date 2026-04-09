import { type ReactNode } from 'react'

import './Modal.css'

export type ModalProps = {
  title: string;
  show: boolean;
  onClose: () => void;
  onClickAway?: () => void;
  children: ReactNode;
}

export const Modal = ({ children, show, title, onClose, onClickAway }: ModalProps) => {

  return show && (
    <div className="modalBackdrop" onClick={() => onClickAway?.()}>
      <div className="modalWindow">
        <div className="modalHeader">
          <div>{title}</div>
          <div><a href="#" onClick={() => onClose()}>X</a></div>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  )
}

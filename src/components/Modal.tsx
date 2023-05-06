import React from 'react';
import '../styles/components/modal.scss'

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
}

export const Modal = ({ children, isOpen }: ModalProps) => {
  return (
    <div
        className={`modal ${isOpen && "modal-open"}`}
    >
        <div>
            {children}
        </div>
    </div>
  )
}

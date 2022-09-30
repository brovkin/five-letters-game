import React, { FC, useEffect } from 'react';
import ReactModal from 'react-modal';
import Icon from '@components/ui/Icon';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  children: JSX.Element | React.ReactNode;
  closeHandler?: () => void;
  title?: JSX.Element | React.ReactNode;
  showCloseIcon?: boolean;
}

ReactModal.setAppElement('#root');

const Modal: FC<ModalProps> = ({
  isOpen,
  closeHandler,
  children,
  title,
  showCloseIcon = true,
}) => {
  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && closeHandler) {
        closeHandler();
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      className="react-modal"
      overlayClassName="modal"
      portalClassName="modal-portal"
      onRequestClose={closeHandler}
      shouldCloseOnOverlayClick={true}
    >
      <div className="modal__wrapper">
        {showCloseIcon ? (
          <Icon
            className="modal__close"
            type="cross"
            clickHandler={closeHandler}
          />
        ) : null}
        {title ? <h3 className="modal__title">{title}</h3> : null}
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;

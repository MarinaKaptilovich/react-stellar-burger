import styles from "./modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { ModalProps } from "../../types/modal";

export default function Modal({ title, children, toggle } : ModalProps) {

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") toggle()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, true)
    return () => {document.removeEventListener('keydown', handleEsc, true)}
  }, []);

  const modalElement = document.querySelector('#modal');
  if (!modalElement) {
    return null;
  };

  return createPortal(
    <ModalOverlay toggle={toggle}>
      <div className={styles.container}>
        <div className={`pt-10 pl-10 pr-10 ${styles.card}`} onClick={event => event.stopPropagation()}>
          <div className={styles.head}>
          <button className={styles.close} onClick={toggle}>
            <CloseIcon type="primary" />
          </button>
            {title && <h2 className="text text_type_main-large" />}
          </div>
          {children}
        </div>
      </div>
    </ModalOverlay>
    , modalElement);
};

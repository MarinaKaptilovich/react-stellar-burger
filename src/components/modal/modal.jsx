import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from 'react-dom';
import { useEffect } from 'react'

function Modal({ title, children, opened, toggle }) {

  const handleEsc = event => {
    console.log(event)
    if (event.key === "Escape") toggle()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, true)
    return () => {document.removeEventListener('keydown', handleEsc, true)}
  }, [])

  return createPortal(
    <ModalOverlay opened={opened} toggle={toggle}>
      <div className={`pt-10 pl-10 pr-10 ${styles.card}`} onClick={event => event.stopPropagation()}>
        <div className={styles.head}>
          <button className={styles.close}>
            <CloseIcon onClick={toggle} />
          </button>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
        </div>
        {children}
      </div>
    </ModalOverlay>
  , document.querySelector('#modal'))
}
  
Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  opened: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}
  
export default Modal;
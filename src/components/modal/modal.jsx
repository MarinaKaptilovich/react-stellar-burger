import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from 'react-dom';
import { 
    useRef,
    useEffect
} from 'react'

function Modal({ children,  onCloseModal}) {

    const modal = useRef();
    const modalRoot = document.getElementById('modal-root');
  
    function handleEsc(e) {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    }
  
    useEffect(() => {
      document.addEventListener('keydown', handleEsc);  
      return () => {document.removeEventListener('keydown', handleEsc)}
    }, [])
  
    return createPortal (
      (
        <div className={styles.container} ref={modal}>
          <ModalOverlay onOverlayClick={onCloseModal} />
          <div className={styles.modal}>
            {children}
            <button className={styles.close_btn}>
              <CloseIcon onClick={onCloseModal} />
            </button>
          </div>
        </div>
      ), modalRoot
    );
  }
  
  Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired
  }
  
  export default Modal;
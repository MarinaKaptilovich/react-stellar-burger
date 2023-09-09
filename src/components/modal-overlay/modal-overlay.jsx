import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css"

function ModalOverlay( { onOverlayClick}) {
    return (
      <section className={styles.overlay} onClick={onOverlayClick}></section>
    );
  }
  
  ModalOverlay.propTypes = {
    onOverlayClick: PropTypes.func.isRequired
  }
  
  export default ModalOverlay;
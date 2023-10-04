import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css"

function ModalOverlay({  opened, toggle }) {
  const overlayClickHandler = () => {
    if (opened) {
      toggle(); 
    }
  };

  return (
    <section 
      className={`${styles.overlay} ${!opened && styles.hidden}`}
      onClick={overlayClickHandler}
    >
    </section>
  )
}
  
ModalOverlay.propTypes = {
  opened: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}
  
export default ModalOverlay;
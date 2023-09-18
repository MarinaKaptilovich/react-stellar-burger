import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css"

function ModalOverlay({ children, opened, toggle }) {
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
      {children}
    </section>
  )
}
  
ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  opened: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}
  
export default ModalOverlay;
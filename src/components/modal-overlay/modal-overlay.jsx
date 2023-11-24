import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css"

export default function ModalOverlay({  children, toggle }) {

  return (
    <section 
      className={`${styles.overlay}`}
      onClick={toggle}
    >
      {children}
    </section>
  )
}
  
ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func.isRequired,
}
  
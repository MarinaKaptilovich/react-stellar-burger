import styles from "./modal-overlay.module.css"
import { ModalOverlayProps } from "../../types/modal"

export default function ModalOverlay({  children, toggle } : ModalOverlayProps) {

  return (
    <section 
      className={`${styles.overlay}`}
      onClick={toggle}
    >
      {children}
    </section>
  )
};
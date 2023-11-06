import styles from './loader.module.css';
import PropTypes from "prop-types";

export default function Loader({ text }) {
    return (
        <div className={styles.wrapper}>
            <span className={styles.loader} />
            {text && 
                <p className='text text_type_main-default text_color_primary mt-8'>
                    { text }
                </p>
            }
        </div>
    )
};

Loader.prototypes = {
    text: PropTypes.string
};
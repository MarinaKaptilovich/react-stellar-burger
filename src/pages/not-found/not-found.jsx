import styles from './not-found.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const naivgate = useNavigate();

    return (
        <main className={styles.main}>
            <p className="text text_type_main-large">
                404
            </p>
            <p className="text text_type_main-large">
                Page not found
            </p>
            <Button
            htmlType='button'
            type='primary'
            size='medium'
            extraClass='mt-6'
            onClick={() => naivgate('/')}
            >
                На главную
            </Button>
        </main>
    )
};
import styles from './forgot-password.module.css';
import { useState } from 'react';
import { 
    useNavigate,
    useLocation,
    Link
} from 'react-router-dom';
import { 
    Button, 
    EmailInput 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { requestForgotPassword } from '../../utils/api';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    async function submitHandler(event) {
        event.preventDefault();
        try {
            await requestForgotPassword(email);
            navigate('/reset-password', { state: { from: location } });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <main className={styles.main}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <h1 className='text text_type_main-medium'>
                    Восстановление пароля
                    </h1>
                    <EmailInput
                        size='default'
                        placeholder={'Укажите e-mail'} 
                        extraClass='mt-6' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name = {'email'}
                    />
                    <Button
                        htmlType='submit'
                        type='primary'
                        size='medium'
                        extraClass='mt-6'
                    >
                        Восстановить
                    </Button>

                    <div className={styles.container}>
                        <p className='text text_type_main-default text_color_inactive'>
                            Вспомнили пароль?
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <span className={styles.link}>
                                    Войти
                                </span>
                            </Link>
                        </p>
                    </div>
                </form>
            </main>
        </>
    )
};

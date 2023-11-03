import styles from './reset-password.module.css';
import { useState } from 'react';
import { 
    useLocation,
    Navigate,
    Link
} from 'react-router-dom';
import { 
    PasswordInput,
    Input, 
    Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { requestResetPassword } from '../../utils/api';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState({hasError: false, errorMessage: ''});
    const [success, setSuccess] = useState({hasSuccess: false, successMessage: ''});
    const location = useLocation();

    function submitHandler(event) {
        event.preventDefault();
        requestResetPassword({ password: password, token: token })
            .then((res => {
                setSuccess({ hasSuccess: res.success, successMessage: res.message  })
            }))
            .catch((err) => {
                setError({ hasError: true, errorMessage: err })
            })
    };

    return (
        <>
        {location.state?.from?.pathname !== '/forgot-password' && 
            <Navigate to='/forgot-password' />
        }

        <main className={styles.main}>
            <form className={styles.form} onSubmit={submitHandler}>
                <h1 className='text text_type_main-medium'>
                    Восстановление пароля
                </h1>
                <PasswordInput
                    size='default'
                    placeholder='Введите новый пароль'
                    value={password}
                    name='password'
                    onChange={e => setPassword(e.target.value)}
                    extraClass='mt-6'
                />
                <Input
                    size='default'
                    placeholder='Введите код из письма'
                    value={token}
                    name='token'
                    onChange={e => setToken(e.target.value)}
                    extraClass='mt-6'
                />
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'
                >
                    Сохранить
                </Button>

                {success.hasSuccess && (
                    <p className='text text_type_main-default text_color_inactive mt-4'>
                        {success.successMessage}
                    </p>
                )}
                {error.hasError && (
                    <p className='text text_type_main-default text_color_inactive mt-4'>
                    {error.errorMessage}
                </p>
                )}

                <div className={styles.container}>
                    <p className='text text_type_main-default text_color_inactive'>
                        Вспомнили пароль?
                    </p>
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        <span className={styles.link}>
                            Войти
                        </span>
                    </Link>
                </div>
            </form>
        </main>
        </>
    )
};
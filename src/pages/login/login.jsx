import styles from './login.module.css';
import { useState } from 'react';
import { 
    Link,
    useNavigate,
    useLocation
} from 'react-router-dom';
import { 
    useSelector,
    useDispatch
} from 'react-redux';
import { 
    Button, 
    EmailInput, 
    PasswordInput 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/user';

export default function Login() {
    const dispatch = useDispatch();
    const error = useSelector(store => store.userData.isError);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    function submitHandler(event) {
        event.preventDefault();
        dispatch(login({ email: email, password: password }));
        navigate(location.state.from || '/profile');
    };

    return (
        <>
            <main className={styles.main}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <h1 className='text text_type_main-medium'>
                    Вход
                    </h1>
                    <EmailInput
                        size='default'
                        placeholder={'E-mail'} 
                        extraClass='mt-6'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name = {'email'}
                    />
                    <PasswordInput
                        size='default'
                        placeholder={'Пароль'} 
                        extraClass='mt-6' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        icon={'ShowIcon'}
                        name={'password'}
                    />
                    <Button
                        size='medium'
                        extraClass='mt-6' 
                        htmlType='submit'
                        type='primary' 
                    >
                        Войти
                    </Button>
                    {error && (
                        <p className='text text_type_main-default text_color_inactive mt-4'>
                            Неверный e-mail или пароль
                        </p>
                    )}

                    <div className={`${styles.container} mt-20`}>
                        <p className='text text_type_main-default text_color_inactive'>
                            Вы - новый пользователь?
                        </p>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                            <span className={styles.link}>
                                Зарегистрироваться
                            </span>
                        </Link>

                        <p className='text text_type_main-default text_color_inactive'>
                            Забыли пароль?
                        </p>
                        <Link to='/forgot-password' style={{ textDecoration: 'none' }}>
                            <span className={styles.link}>
                                Восстановить пароль
                            </span>
                        </Link>
                    </div>
                </form>
            </main>
        </>
    )    
};
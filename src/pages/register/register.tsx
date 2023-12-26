import styles from './register.module.css';
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Input, 
    Button, 
    EmailInput, 
    PasswordInput 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { requestRegister } from '../../utils/api';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        requestRegister({email: email, password: password, name: name});
    };

    return (
        <>
            <main className={styles.main}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <h1 className='text text_type_main-medium'>
                        Регистрация
                    </h1>
                    <Input
                        size='default'
                        type={'text'} 
                        placeholder={'Имя'} 
                        extraClass='mt-6' 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        name={'name'}
                    />
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
                        htmlType='submit' 
                        type='primary' 
                        size='medium' 
                        extraClass='mt-6'
                    >
                        Зарегистрироваться
                    </Button>

                    <div className={styles.container}>
                        <p className='text text_type_main-default text_color_inactive mt-20'>
                            Уже зарегистрированы?
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
    );
};

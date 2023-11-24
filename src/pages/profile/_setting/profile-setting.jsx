import styles from './profile-setting.module.css';
import { useState } from "react";
import { 
    Input,
    PasswordInput,
    EmailInput,
    Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { changeUser } from '../../../services/user';

export default function ProfileSetting() {
    const dispatch = useDispatch();

    const [name, setName] = useState({ active: true, value: '' });
    const [password, setPassword] = useState({ active: true, value: '' });
    const [email, setEmail] = useState({ active: true, value: '' });
    const [buttonState, setButtonState] = useState(false);

    function clickCancelHandler() {
        setName({ ...name, value: '' })
        setPassword({ ...password, value:'' })
        setEmail({ ...email, value: '' })
        setButtonState(false)
    };

    function submitHandler(event) {
        event.preventDefault();
        dispatch(changeUser({ 
            name: name.value, 
            password: password.value, 
            email: email.value 
        }))
    };

    return (
        <form className={styles.form} actiom='profile' onSubmit={submitHandler}>
            <Input
                type={'text'} 
                placeholder={'Имя'}  
                value={name.value}
                icon={'EditIcon'}
                name={'name'}
                disabled={name.active}
                onChange={(e) => {
                    setButtonState(true)
                    setName({ ...name, value: e.target.value })
                }}
            />
            <EmailInput
                type={'text'} 
                placeholder={'Логин'}
                value={email.value}
                icon={'EditIcon'}
                name={'email'}
                disabled={email.active}
                onChange={(e) => {
                    setButtonState(true)
                    setEmail({ ...email, value: e.target.value })
                }}
            />
            <PasswordInput
                type={'text'} 
                placeholder={'Пароль'} 
                value={password.value}
                icon={'EditIcon'}
                name={'password'}
                disabled={password.active}
                onChange={(e) => {
                    setButtonState(true)
                    setPassword({ ...password, value: e.target.value })
                }}
            />
            {buttonState && 
            <>
                <Button
                    htmlType='button'
                    type='secondary'
                    size='medium'
                    onClick={clickCancelHandler}
                >
                    Отмена
                </Button>

                <Button
                    htmlType='submit'
                    type='secondary'
                    size='medium'
                >
                    Сохранить
                </Button>
            </>
            }
        </form>
    )
};
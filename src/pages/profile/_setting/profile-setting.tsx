import styles from './profile-setting.module.css';
import { useState } from "react";
import React from 'react';
import { 
    Input,
    PasswordInput,
    EmailInput,
    Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { 
    useAppDispatch,
    useAppSelector
} from '../../../types/hooks';
import { changeUser } from '../../../services/user';
import { useForm } from './hook';

export default function ProfileSetting() {
    const dispatch = useAppDispatch();

    const user = useAppSelector(store => store.userData.user);

    const defaultName = user ? user.name : '';
    const defaultEmail = user ? user.email : '';
    const defaultPassword = '';

    const [formChanged, setFormChanged] = useState(false);

    const { values, handleChange, setValues } = useForm({
        name: defaultName,
        email: defaultEmail,
        password: defaultPassword
    });

    function clickCancelHandler() {
        setValues({
            ...values,
            name: defaultName,
            email: defaultEmail,
            password: defaultPassword
        });
        setFormChanged(false);
    };

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormChanged(false);
        dispatch(changeUser({ ...values } as {
            name: string;
            email: string;
            password: string
        }));
        setValues({
            ...values,
            password: defaultPassword
        });
        event.currentTarget.blur();
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                type={'text'} 
                placeholder={'Имя'}  
                value={values.name as string}
                icon={'EditIcon'}
                name={'name'}
                onChange={(e) => {
                    handleChange(e);
                    setFormChanged(true);
                }}
            />
            <EmailInput
                placeholder={'Логин'}
                value={values.email as string}
                isIcon={true}
                name={'email'}
                onChange={(e) => {
                    handleChange(e);
                }}
            />
            <PasswordInput
                placeholder={'Пароль'} 
                value={values.password as string}
                icon={'EditIcon'}
                name={'password'}
                onChange={(e) => {
                    handleChange(e);
                }}
            />
            {formChanged && 
            <div className={styles.handlers}>
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
            </div>
            }
        </form>
    )
};
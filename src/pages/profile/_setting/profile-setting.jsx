import styles from './profile-setting.module.css';
import { 
    useState ,
    useRef,
    useEffect
} from "react";
import { 
    Input,
    PasswordInput,
    EmailInput,
    Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { 
    useSelector,
    useDispatch
} from 'react-redux';
import { changeUser } from '../../../services/user';

export default function ProfileSetting() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.userData.user);
    const [name, setName] = useState({ active: true, value: '' });
    const [password, setPassword] = useState({ active: true, value: '' });
    const [email, setEmail] = useState({ active: true, value: '' });
    const [buttonState, setButtonState] = useState(false);

    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);

    useEffect(() => {
        setName({ active: true, value: user.name });
        setEmail({ active: true, value: user.email });
    }, []);
    
    function clickNameHandler() {
        setName({ ...name, active: !name.active })
        if (nameRef.current !== document.activeElement) {
            setTimeout(() => nameRef.current.focus(), 100) 
        }
    };

    function clickPasswordHandler() {
        setPassword({ ...password, active: !password.active })
        if (passwordRef.current !== document.activeElement) {
            setTimeout(() => passwordRef.current.focus(), 100)
        }
    };

    function clickEmailHandler() {
        setEmail({ ...email, active: !email.active })
        if (emailRef.current !== document.activeElement) {
            setTimeout(() => emailRef.current.focus(), 100)
        }
    };

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
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                ref={nameRef} 
                type={'text'} 
                placeholder={'Имя'}  
                value={name.value}
                icon={'EditIcon'}
                name={'name'}
                disabled={name.active}
                onIconClick={clickNameHandler}
                onChange={(e) => {
                    setButtonState(true)
                    setName({ ...name, value: e.target.value })
                }}
            />
            <EmailInput
                ref={emailRef}
                type={'text'} 
                placeholder={'Логин'}
                value={email.value}
                icon={'EditIcon'}
                name={'email'}
                disabled={email.active}
                onIconClick={clickEmailHandler}
                onChange={(e) => {
                    setButtonState(true)
                    setEmail({ ...email, value: e.target.value })
                }}
            />
            <PasswordInput
                ref={passwordRef}
                type={'text'} 
                placeholder={'Пароль'} 
                value={password.value}
                icon={'EditIcon'}
                name={'password'}
                disabled={password.active}
                onIconClick={clickPasswordHandler}
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
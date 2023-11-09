import styles from './profile.module.css';
import { useState } from "react";
import { 
    useLocation,
    Link,
    Outlet
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/user';

export default function Profile() {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const location = useLocation().pathname;

    function onLogout(event) {
        setActive(true);
        event.preventDefault();
        dispatch(logout());
    };

    return (
        <main className={styles.main}>
            {(location === '/profile' || location === '/profile/orders') &&
            <div className={styles.sidebar}>
                <nav className={styles.nav}>
                    <Link
                        to='/profile'
                        className={`text text_type_main-medium text_color_${location.endsWith('profile') ? 'primary': 'inactive'}`}
                    >
                        Профиль
                    </Link>

                    <Link
                        to='/profile/orders'
                        className={`text text_type_main-medium text_color_${location.includes('/orders') ? 'primary': 'inactive'}`}
                    >
                        История заказов
                    </Link>

                    <Link
                        to='/profile/login'
                        className={`text text_type_main-medium ${location.includes('/orders') ? 'primary': 'inactive'}`}
                        onClick={onLogout}
                    >
                        Выход
                    </Link>
                </nav>

                <span className='text text_type_main-default text_color_inactive'>
                    {location === '/profile' ?
                        'В этом разделе вы можете изменить свои персональные данные' :
                    location === '/profile/orders' ?
                        'В этом разделе вы можете просмотреть свою историю заказов' :
                        ''                   
                    }
                </span>
            </div>
            }
            <Outlet />
        </main>
    )
};
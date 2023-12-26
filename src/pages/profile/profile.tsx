import styles from './profile.module.css';
import { useState } from "react";
import React from 'react';
import { 
    useLocation,
    Link,
    Outlet
} from 'react-router-dom';
import { usingDispatch } from '../../types/hooks';
import { logout } from '../../services/user';

export default function Profile() {
    const dispatch = usingDispatch();
    const [active, setActive] = useState(false);
    const location = useLocation().pathname;

    function onLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
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
                        to='/login' 
                        className="text text_type_main-medium text_color_inactive"
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
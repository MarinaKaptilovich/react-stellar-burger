import styles from './profile.module.css';
import { useState } from "react";
import { 
    useLocation,
    useNavigate,
    NavLink,
    Outlet
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/user';

export default function Profile() {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
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
                        <NavLink
                            to='/profile'
                            className={({ isActive }) => 
                              isActive ? styles.active : styles.pending
                            }
                        end
                        >
                            Профиль
                        </NavLink>

                        <NavLink
                            to='orders'
                            className={({ isActive }) => 
                              isActive ? styles.active : styles.pending
                            }
                        end
                        >
                            История заказов
                        </NavLink>

                        <NavLink
                            to='/login'
                            className={active ? styles.active : styles.pending}
                            onClick={onLogout}
                            end
                        >
                            Выход
                        </NavLink>
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
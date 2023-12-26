import { 
    BurgerIcon, 
    ListIcon, 
    ProfileIcon, 
    Logo 
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { 
    NavLink,
    Link,
    useLocation
} from "react-router-dom";

export default function AppHeader() {
    const { pathname } = useLocation();

    return (
        <header className={`pt-4 pb-4 ${styles.header}`}>
            <div className={styles.content}> 
                <nav className={styles.nav}>
                    <NavLink 
                        to='/'
                        type={pathname === '/' ? 'primary' : 'inactive'}
                        className={styles.nav__link}
                    >
                        <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary' } />Конструктор
                    </NavLink>
                    <NavLink 
                        to='/feed'
                        type="inactive"
                        className={styles.nav__link}
                    >
                        <ListIcon type='secondary' />Лента заказов
                    </NavLink>
                </nav>
                <Link to='' className={styles.logo}><Logo /></Link>
                <NavLink 
                    to='/profile'
                    type={pathname.includes('/profile') ? 'primary' : 'inactive' }
                    className={styles.nav__link}
                >
                    <ProfileIcon type={pathname.includes('/profile') ? 'primary' : 'secondary' } />Личный кабинет
                </NavLink>
            </div>
        </header>
    );
}

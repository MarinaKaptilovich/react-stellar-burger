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
    const location = useLocation();

    return (
        <header className={`pt-4 pb-4 ${styles.header}`}>
            <div className={styles.content}> 
                <nav className={styles.nav}>
                    <NavLink 
                        to='/'
                        type={location.pathname === '/' ? 'primary' : 'inactive'}
                    >
                        <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary' } />Конструктор
                    </NavLink>
                    <NavLink 
                        to='/feed'
                        type="inactive"
                    >
                        <ListIcon type='secondary' />Лента заказов
                    </NavLink>
                </nav>
                <Link to='' className={styles.logo}><Logo alt="Логотип" /></Link>
                <NavLink 
                    to='/profile'
                    type={location.pathname.includes('/profile') ? 'primary' : 'inactive' }
                >
                    <ProfileIcon type={location.pathname.includes('/profile') ? 'primary' : 'secondary' } />Личный кабинет
                </NavLink>
            </div>
        </header>
    );
}

import { 
    BurgerIcon, 
    ListIcon, 
    ProfileIcon, 
    Logo 
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const NavLink = (props) => (
    <a href="#" className={`pl-5 pr-5 pt-4 pb-4 ${styles.nav__link}`}>
        {props.icon}
        <p className="text text_type_main-default">{props.text}</p>
    </a>
)

function AppHeader() {
    return (
        <header className={`pt-4 pb-4 ${styles.header}`}>
            <div className={styles.content}> 
                <nav className={styles.nav}>
                    <NavLink href="#" text='Конструктор' icon={ <BurgerIcon type="secondary" /> } />
                    <NavLink href="#" text='Лента заказов' icon={ <ListIcon type="secondary" /> } />
                </nav>
                <a href="#" className={styles.logo}><Logo alt="Логотип" /></a>
                <NavLink href="#" text='Личный кабинет' icon={ <ProfileIcon type="secondary" /> } />
            </div>
        </header>
    );
}
  
export default AppHeader;
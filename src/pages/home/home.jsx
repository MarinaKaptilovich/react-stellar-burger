import styles from './home.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export default function Home() {

    return (
        <main className={styles.main}>
            <>
                <BurgerIngredients />
                <BurgerConstructor />
            </>
        </main>
    );
}
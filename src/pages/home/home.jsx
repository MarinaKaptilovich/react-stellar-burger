import styles from './home.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useSelector } from "react-redux";

export default function Home() {
    const ingredients = useSelector(state => state.ingredientsData);

    return (
        <main className={styles.main}>
            {!ingredients.hasError ? (
            <>
                <BurgerIngredients />
                <BurgerConstructor />
            </>
            ) : (
            <p className="text text_type_main-large">
                Произошла ошибка! - {ingredients.errorMessage}
            </p>
            )}
        </main>
    );
}
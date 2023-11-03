import styles from './home.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export default function Home() {
    const ingredientsData = useSelector(state => state.ingredientsData);

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
                {
                    !ingredientsData.hasError && (
                        <>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </>
                    )
                }
                {
                    ingredientsData.hasError && (
                        <p className="text text_type_main-large">
                            Произошла ошибка! - {ingredientsData.errorMessage}
                        </p>
                    )
                }
            </main>
        </DndProvider>
    );
}
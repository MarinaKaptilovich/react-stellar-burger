import styles from './home.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useActions } from '../../utils/use-actions';
import { getIngredients } from '../../utils/api';

export default function Home() {
    const ingredientsData = useSelector(state => state.ingredientsData);
    const { setIngredients, setError } = useActions();

    useEffect(() => {
        getIngredients()
            .then(ingredient => setIngredients([...ingredient.data]))
            .catch(error => setError({ hasError: true, errorMessage: error }))
      }, [])

    console.log(ingredientsData);

    return (
        <main className={styles.main}>
            {!ingredientsData.hasError ? (
            <>
                <BurgerIngredients />
                <BurgerConstructor />
            </>
            ) : (
            <p className="text text_type_main-large">
                Произошла ошибка! - {ingredientsData.errorMessage}
            </p>
            )}
        </main>
    );
}
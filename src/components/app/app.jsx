import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../utils/use-actions";
import { getIngredients } from "../../utils/api";

function App() {
  const { setIngredients, setError } = useActions();
  const ingredientsData = useSelector(state => state.ingredientsData);

  useEffect(() => {
    getIngredients()
      .then(ingredient => setIngredients([...ingredient.data]))
      .catch(error => setError({ hasError: true, errorMessage: error }))
  }, [])

  return (
    <>
      <AppHeader />
        <main className={styles.app}>
          {
            !ingredientsData.hasError && (
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
          )}
          {ingredientsData.hasError && (
            <p className="text text_type_main-large">
              Произошла ошибка! - {ingredientsData.errorMessage}
            </p>
          )}
        </main>
    </>
  );
}

export default App;

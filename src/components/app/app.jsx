import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { getIngredients } from "../../utils/api";
import { 
  useEffect,
  useState
} from "react";
import { ContextProvider } from "../../services/app-context";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getIngredients()
    .then(ingredients => {
      setIngredients(ingredients.data); 
    })
    .catch(error => {
      setError(error); 
    });
}, []); 

  return (
    <ContextProvider>
      <AppHeader />
      <main className={styles.app}>
        {ingredients.length > 0 && (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor />
          </>
        )}
      </main>

    </ContextProvider>
  );
}

export default App;

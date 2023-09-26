import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getIngredients } from "../../utils/api";
import { 
  useEffect,
  useState
} from "react";
import { ContextProvider } from "../../services/app-context";

function App() {
  const [ingredients, setIngredients] = useState({ingredients: [], hasError: false, errorMessage: ''});
  const [modalIngredient, setModalIngredient] = useState({ingredient: ''});
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const openIngredientModal = (ingredient) => {
    setModalIngredient(ingredient);
    setIsIngredientModalOpen(true);
  };
  
  const closeIngredientModal = () => {
    setIsIngredientModalOpen(false);
  };
  
  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };
  
  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  useEffect(() => {
    getIngredients()
    .then(res => {
      setIngredients({...ingredients, ingredients: [...res.data]}); 
    })
    .catch(error => {
      setIngredients({...ingredients, hasError: true, errorMessage: error}); 
    });
}, []); 

  return (
    <ContextProvider>
      <AppHeader />
      <main className={styles.app}>
        {ingredients.isLoaded > 0 && (
          <>
            <BurgerIngredients ingredients={ingredients} onModalOpen={openIngredientModal} />
            <BurgerConstructor onModalOpen={openOrderModal} />
          </>
        )}
        {ingredients.hasError &&(
          <p className="text text_type_main-large">
            Произошла ошибка! - {ingredients.errorMessage}
          </p>
        )}
      </main>

      {isIngredientModalOpen && (
        <Modal
          title="Детали ингредиента"
          toggle={closeIngredientModal}
          opened={isIngredientModalOpen}
        >
          <IngredientDetails ingredient={modalIngredient.ingredient} />
        </Modal>
      )}

      {isOrderModalOpen && (
        <Modal toggle={closeOrderModal} opened={isOrderModalOpen}>
          <OrderDetails />
        </Modal>
      )}
    </ContextProvider>
  );
}

export default App;

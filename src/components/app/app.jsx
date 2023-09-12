import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getIngredients, api } from "../../utils/api";
import { 
  useEffect,
  useState
} from "react"

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [modalIngredient, setModalIngredient] = useState(null);
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
    getIngredients(api)
    .then(ingredients => {
      setIngredients(ingredients.data); 
    })
    .catch(error => {
      setError(error); 
    });
}, []); 

  return (
    <>
    <AppHeader />
    <main className={styles.app}>
      {ingredients.length > 0 && (
      <>
        <BurgerIngredients ingredients={ingredients} onModalOpen={openIngredientModal} />
        <BurgerConstructor data={ingredients} onModalOpen={openOrderModal} />
      </>
      )}
    </main>
    {isIngredientModalOpen && (
      <Modal
        title="Детали ингредиента"
        toggle={closeIngredientModal}
        opened={isIngredientModalOpen}
      >
        <IngredientDetails ingredient={modalIngredient} />
      </Modal>
    )}

    {isOrderModalOpen && (
      <Modal toggle={closeOrderModal} opened={isOrderModalOpen}>
        <OrderDetails />
      </Modal>
    )}
    </>
  );
}

export default App;

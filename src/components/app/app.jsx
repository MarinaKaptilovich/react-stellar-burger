import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingridients/burger-ingridients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getIngredients } from "../../utils/api";
import { 
  useEffect,
  useState
} from "react"

function App() {
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(
    {
      type: '',
      isActive: false,
      ingredient: {},
    }
  );

  const [data, setData] = useState(
    {
      ingredients: [],
      isLoaded: false,
    }
  );

  const handleCloseModal = () => {
    setModal(
      {
        ...modal,
        isActive: false,
      }
    );
  }

  const handleOpenModal = (modalType, item = {}) => {
    switch (modalType) {
      case 'submit':
        setModal(
          {
            ...modal,
            type: 'order__details',
            isActive: true,
          }
        );
        break;
      case 'ingredient':
        setModal(
          {
            ...modal,
            type: 'ingredient__details',
            isActive: true,
            ingredient: item,
          }
        );
        break;
      default: 
        break;
    }
  }
   
  useEffect(() => {
    setData({...data, loading: true});
    getIngredients()
      .then(res => {
        setData({ ...data, ingredients: [...res.data], isLoaded: true});
        })
      .catch(err => {
        setError(err.message);
        console.log('Error: ', error);
        })
  }, []);

  return (
    <div>
      <AppHeader />
      <main className={`${styles.app}`}>
        {data.isLoaded && <BurgerIngredients data={ data.ingredients } onModalOpen={handleOpenModal} />}
        {data.isLoaded && <BurgerConstructor data={ data.ingredients } onModalOpen={handleOpenModal} />}
      </main>
      {modal.isActive &&
        <Modal onCloseModal={handleCloseModal}>
          {modal.type === 'order__details' && <OrderDetails />}
          {modal.type === 'ingredient__details' && <IngredientDetails ingredient={modal.ingredient} />}
        </Modal>
      }
    </div>
  );
}

export default App;

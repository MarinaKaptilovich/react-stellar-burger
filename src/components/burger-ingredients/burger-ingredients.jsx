import { 
  useState,
  useContext,
  useMemo
} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import { BurgerContext } from '../../services/app-context';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients({ ingredients }) {
  const [currentTab, setCurrentTab] = useState('bun');

  const dispatchBurger = useContext(BurgerContext);

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);

  const [modalIngredient, setModalIngredient] = useState(null);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

  const openIngredientModal = (ingredient) => {
    setModalIngredient(ingredient);
    setIsIngredientModalOpen(true);
  };
  
  const closeIngredientModal = () => {
    setIsIngredientModalOpen(false);
  };


  return (
    <section className={`pt-10 main-block ${styles.section}`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={styles.categories}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>Булки</Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>Соусы</Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>Начинки</Tab>
      </div>
      <div className={`custom-scroll pt-10 ${styles.ingredientsPanel}`}>
        <>
          <div>
            <p className="text text_type_main-medium mb-6">
              Булки
            </p>
            <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
              {buns.map((ingredient, index)=> (
                <Ingredient
                  key={index}
                  ingredient={ingredient}
                  amount={1}
                  onModalOpen={() => {
                    openIngredientModal(ingredient)
                    dispatchBurger({
                      type:  'addBun',
                      payload: ingredient
                    })
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text text_type_main-medium mt-10 mb-6">
              Соусы
            </p>
            <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
              {sauces.map((ingredient, index) => (
                <Ingredient
                  key={index}
                  ingredient={ingredient}
                  amount={1}
                  onModalOpen={() => {
                    openIngredientModal(ingredient)
                    dispatchBurger({
                      type:  'addIngredient',
                      payload: ingredient
                    })
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text text_type_main-medium mt-10 mb-6">
              Начинки
            </p>
            <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
              {mains.map((ingredient, index)=> (
                <Ingredient
                  key={index}
                  ingredient={ingredient}
                  amount={1}
                  onModalOpen={() => {
                    openIngredientModal(ingredient)
                    dispatchBurger({
                      type:  'addIngredient',
                      payload: ingredient
                    })
                  }}
                />
              ))}
            </div>
          </div>
        </>   
      </div>

      {isIngredientModalOpen && (
        <Modal
          title="Детали ингредиента"
          toggle={closeIngredientModal}
          opened={isIngredientModalOpen}
        >
          <IngredientDetails ingredient={modalIngredient} />
        </Modal>
      )}
    </section>
  )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default BurgerIngredients;
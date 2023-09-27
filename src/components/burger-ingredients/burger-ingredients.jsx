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

function BurgerIngredients({ ingredients, onModalOpen }) {
  const categories = [
      {bun: 'Булки'},
      {sauce: 'Соусы'},
      {main: 'Начинки'}
  ];
  const [currentTab, setCurrentTab] = useState(Object.keys(categories[0])[0]);

  const dispatchBurger = useContext(BurgerContext);

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);

  return (
    <section className={`pt-10 main-block ${styles.section}`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={styles.categories}>
        {categories.map(item => {
          const id = Object.keys(item)[0]
          const name = item[id]
          return <Tab value={id} key={id} active={currentTab === id} onClick={setCurrentTab}>{name}</Tab>
        })}
      </div>
      <div className={`custom-scroll pt-10 ${styles.ingredientsPanel}`}>
        {categories.map(category => {
          const categoryName = Object.keys(category)[0] 
          return (
            <>
              <div key={categoryName}>
                  <h2 className="text text_type_main-large">{category[categoryName]}</h2>
                  <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
                    {buns.map(item => (
                      <Ingredient
                        key={item._id}
                        ingredient={item}
                        amount={1}
                        onModalOpen={() => {
                          dispatchBurger({
                            type:  'addBun',
                            payload: item
                          })
                        }}
                      />
                    ))}
                  </div>
              </div>

              <div key={categoryName}>
                <h2 className="text text_type_main-large">{category[categoryName]}</h2>
                <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
                  {sauces.map(item => (
                    <Ingredient
                      key={item._id}
                      ingredient={item}
                      amount={1}
                      onModalOpen={() => {
                        dispatchBurger({
                          type:  'addIngredient',
                          payload: item
                        })
                      }}
                    />
                  ))}
                </div>
              </div>

              <div key={categoryName}>
                <h2 className="text text_type_main-large">{category[categoryName]}</h2>
                <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
                  {mains.map(item => (
                    <Ingredient
                      key={item._id}
                      ingredient={item}
                      amount={1}
                      onModalOpen={() => {
                        dispatchBurger({
                          type:  'addIngredient',
                          payload: item
                        })
                      }}
                    />
                  ))}
                </div>
              </div>
            </>   
          )
        })}
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired, 
    onModalOpen: PropTypes.func.isRequired
}

export default BurgerIngredients;
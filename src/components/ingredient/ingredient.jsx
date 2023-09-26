import {
  useContext,
  useMemo
} from 'react';
import { 
    Counter,
    CurrencyIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import styles from './ingredient.module.css';
import { BurgerContext } from '../../services/app-context';

function Ingredient({ ingredient, amount, onModalOpen }) {
  const dispatchBurger = useContext(BurgerContext);

  const buns = useMemo(() => ingredient.filter((item) => item.type === 'bun'), [ingredient]);
  const mains = useMemo(() => ingredient.filter((item) => item.type === 'main'), [ingredient]);
  const sauces = useMemo(() => ingredient.filter((item) => item.type === 'sause'), [ingredient]);

  return (
    <div>
      <p className="text text_type_main-medium mb-6">
        Булки
      </p>
      {
        buns.map(item => (
          <div 
            className={styles.card}
            key={item._id}
            onClick={() => {
              dispatchBurger({
                type:  'addBun',
                payload: item
              })
            }}
          >
            {amount && <Counter count={amount} />}
            <img className="ml-4 mr-4" src={item.image} alt={item.name} />
            <p className={`text text_type_digits-default ${styles.price}`}>
              {item.price} 
              <CurrencyIcon />
            </p>
            <p className={`text text_type_main-default ${styles.name}`} >{item.name}</p>
          </div>
        ))
      }
      <p className="text text_type_main-medium mt-10 mb-6">
        Соусы
      </p>
      {
        sauces.map(item => (
          <div 
            className={styles.card}
            key={item._id}
            onClick={() => {
              dispatchBurger({
                type:  'addIngredient',
                payload: item
              })
            }}
          >
            {amount && <Counter count={amount} />}
            <img className="ml-4 mr-4" src={item.image} alt={item.name} />
            <p className={`text text_type_digits-default ${styles.price}`}>
              {item.price} 
              <CurrencyIcon />
            </p>
            <p className={`text text_type_main-default ${styles.name}`} >{item.name}</p>
          </div>
        ))
      }
      <p className="text text_type_main-medium mt-10 mb-6">
        Начинки
      </p>
      {
        mains.map(item => (
          <div 
            className={styles.card}
            key={item._id}
            onClick={() => {
              dispatchBurger({
                type:  'addIngredient',
                payload: item
              })
            }}
          >
            {amount && <Counter count={amount} />}
            <img className="ml-4 mr-4" src={item.image} alt={item.name} />
            <p className={`text text_type_digits-default ${styles.price}`}>
              {item.price} 
              <CurrencyIcon />
            </p>
            <p className={`text text_type_main-default ${styles.name}`} >{item.name}</p>
          </div>
        ))
      }
    </div>
  )
}
  
Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
  amount: PropTypes.number,
  onModalOpen: PropTypes.func.isRequired
}

export default Ingredient;
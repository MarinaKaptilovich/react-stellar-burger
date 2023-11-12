import { 
    Counter,
    CurrencyIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import styles from './ingredient.module.css';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { 
  useLocation,
  Link
} from 'react-router-dom';

export default function Ingredient({ ingredientData }) {
  const burgerData = useSelector(state => state.burgerData);
  const location = useLocation();

  const getAmountOfIngredient = (ingredient, array) => {
    const amount = array.reduce((total, item) => {
      if (item._id === ingredient._id) {
        return total += 1
      }
      return total
    }, 0)
    return amount
  };

  let ingredientAmount;

  if (ingredientData.type === 'bun') {
    ingredientAmount = getAmountOfIngredient(ingredientData, burgerData.bun)
  } else {
    ingredientAmount = getAmountOfIngredient(ingredientData, burgerData.fillings)
  };

  const [, drag] = useDrag({
    type: 'ingredient',
    item: ingredientData
  });
  
  const { name, price, image } = ingredientData;

  return (
    <Link 
      to={`/ingredients/${ingredientData._id}`}
      state={{ background: location }} 
      className={styles.card} 
      ref={drag}
    >
      {ingredientAmount > 0 && <Counter count={ingredientAmount} />}
      <img src={image} alt={name} className="pl-4 pr-4" />
      <p className={`text text_type_digits-default ${styles.price}`}>{price} <CurrencyIcon /></p>
      <p className={`text text_type_main-default ${styles.name}`} >{name}</p>
    </Link>
  )
}
  
Ingredient.propTypes = {
  ingredientData: ingredientPropType.isRequired
}

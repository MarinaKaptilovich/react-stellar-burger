import { 
    Counter,
    CurrencyIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { useAppSelector } from '../../types/hooks';
import { useDrag } from 'react-dnd';
import { 
  useLocation,
  Link
} from 'react-router-dom';
import { IngredientProps } from '../../types/ingredients';
import { getAmountOfIngredient } from './hook';

export default function Ingredient({ ingredientData } : IngredientProps) {
  const burgerData = useAppSelector(state => state.burgerData);
  const location = useLocation();

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
      <p className={`text text_type_digits-default ${styles.price}`}>{price} <CurrencyIcon type='primary'/></p>
      <p className={`text text_type_main-default ${styles.name}`} >{name}</p>
    </Link>
  )
}

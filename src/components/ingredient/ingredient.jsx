import { 
    Counter,
    CurrencyIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import styles from './ingredient.module.css';

function Ingredient({ ingredient, amount, onModalOpen }) {
    const { name, price, image } = ingredient;

    return (
        <div className={styles.card} onClick={() => onModalOpen(ingredient)}>
          {amount && <Counter count={amount} />}
          <img src={image} alt={name} className="pl-4 pr-4" />
          <p className={`text text_type_digits-default ${styles.price}`}>{price} <CurrencyIcon /></p>
          <p className={`text text_type_main-default ${styles.name}`} >{name}</p>
        </div>
    )
}
  
Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
  amount: PropTypes.number,
  onModalOpen: PropTypes.func.isRequired
}

export default Ingredient;
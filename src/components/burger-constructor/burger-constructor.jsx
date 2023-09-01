import React from "react";
import { 
    Button, 
    ConstructorElement, 
    CurrencyIcon, 
    DragIcon 
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import { ingredientPropType } from "../../utils/prop-types";

function BurgerConstructor({ data }) {
    const bun = data.filter(ingridient => ingridient.type === 'bun');
    const ingredients = data.filter(ingridient => ingridient.type === 'main');
    const totalPrice = ingredients.reduce((sum, item) => {return sum + item.price}, 0) + bun.reduce((sum, item) => {return sum + item.price}, 0);
    
    return(
      <section className={`mt-25 ${styles.section}`}>
          <ConstructorElement
            type="top"
            text={bun[0].name + '' + '(верх)'}
            price={bun[0].price}
            thumbnail={bun[0].image}
            isLocked={true}
            extraClass='ml-8 mr-2'
          />
        <ul className={`${styles.ingridients} custom-scroll`}>
          {ingredients.map(main => (
            <li className={`${styles.ingridient} mr-1`} key={main._id}>
              <DragIcon type="primary" />
              <ConstructorElement
              text={main.name}
              price={main.price}
              thumbnail={main.image}
              />
            </li>
          ))}
        </ul>
          <ConstructorElement
            type="bottom"
            text={bun[1].name + '' + '(низ)'}
            price={bun[1].price}
            thumbnail={bun[1].image}
            isLocked={true}
            extraClass='ml-8 mr-2'
          />
        <div className={styles.total_price}>
          <p className='text text_type_digits-medium'>
            {totalPrice}
            <span className='ml-2'><CurrencyIcon type='primary' /></span>
          </p>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
}

BurgerConstructor.propTypes = {
  data: ingredientPropType
}; 

export default BurgerConstructor;
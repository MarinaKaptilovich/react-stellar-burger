import PropTypes from "prop-types";
import { 
  useMemo,
  useContext
} from "react";
import { 
    Button, 
    ConstructorElement, 
    CurrencyIcon, 
    DragIcon 
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import { 
  ConstructorContext, 
  OrderDispatchContext 
} from "../../services/app-context";
import { createOrder } from "../../utils/api";

function BurgerConstructor({ onModalOpen }) {
  const burger = useContext(ConstructorContext);
  const dispatchOrder = useContext(OrderDispatchContext);

  const bun = useMemo(() => burger.bun, [burger]);
  const ingredients = useMemo(() => burger.ingredients, [burger]);
  
  const totalPrice = useMemo(() => {
    let bunPrice = 0;
    let ingredientsPrice = 0;
    if (bun) {
      bunPrice = bun.price * 2;
    }
    if (ingredients) {
      ingredientsPrice = ingredients.reduce((price, ingredient) => {
        return price + ingredient.price
      }, 0)
    }
    return bunPrice + ingredientsPrice;
  },
    [bun, ingredients]
  );

  function getIngredientsId(array) {
    return array.reduce((total,item) => {
      return [...total, item._id]
    }, [])
  };

  const getOrder = () => {
    const ingredientsId = getIngredientsId([bun, ...ingredients]);
    if (ingredientsId.length > 0) {
      createOrder(ingredientsId)
        .then(res => {
          dispatchOrder({
            type: 'addOrder',
            payload: res
          })
        })
        .then(res => {
          onModalOpen()
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return(
    <section className={`mt-25 ${styles.section}`}>
      {bun && (
        <ConstructorElement
          type="top"
          text={bun.name + '' + '(верх)'}
          price={bun.price}
          thumbnail={bun.image}
          isLocked={true}
          extraClass='ml-8 mr-2'
        />
      )}
      <ul className={`${styles.ingredients} custom-scroll`}>
        {ingredients.map(main => (
          <li className={`${styles.ingredient} mr-1`} key={main._id}>
            <DragIcon type="primary" />
            <ConstructorElement
            text={main.name}
            price={main.price}
            thumbnail={main.image}
          />
          </li>
        ))}
      </ul>
      {bun && (
        <ConstructorElement
          type="bottom"
          text={bun.name + '' + '(низ)'}
          price={bun.price}
          thumbnail={bun.image}
          isLocked={true}
          extraClass='ml-8 mr-2'
      />
      )}
      <div className={styles.total_price}>
        <p className='text text_type_digits-medium'>
          {totalPrice}
          <span className='ml-2'><CurrencyIcon type='primary' /></span>
        </p>
        <Button 
          onClick={getOrder} 
          htmlType="button" 
          type="primary" 
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onModalOpen: PropTypes.func.isRequired
}; 

export default BurgerConstructor;
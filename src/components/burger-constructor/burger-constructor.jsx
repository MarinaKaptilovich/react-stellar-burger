import { 
  useMemo,
  useState 
} from "react";
import { 
  Button, 
  ConstructorElement, 
  CurrencyIcon, 
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorItem from "../constructor-item/constructor-item";
import { useActions } from "../../utils/use-actions";
import { getOrder } from "../../services/order-details";

export default function BurgerConstructor() {
  const burgerData = useSelector(state => state.burgerData);
  const { addBun, addFilling } = useActions();
  const dispatch = useDispatch();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };
  
  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const [, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type === 'bun') {
        addBun(item)
      } else {
        addFilling(item)
      }
    }
  }));

  const fillings = useMemo(() => burgerData.fillings, [burgerData]);
  const bun = useMemo(() => burgerData.bun, [burgerData]);

  const totalPrice = useMemo(() => {
    let fillingsPrice = 0;
    let bunPrice = 0;
    if (fillings.length > 0) {
      fillingsPrice = fillings.reduce((sum, item) => {return sum + item.price}, 0);
    }
    if (bun.length > 0) {
      bunPrice = bun[0].price * 2;
    }
    return fillingsPrice + bunPrice;
  }, [fillings, bun]);

  const handleGetOrder = () => {
    const totalIngredients = [...bun, ...fillings]
    if (totalIngredients.length >= 1) {
      dispatch(getOrder(totalIngredients))
      openOrderModal()
    }
  }

  return(
    <section className={`mt-25 ${styles.section}`} ref={drop}>
      <div className={`custom-scroll pr-2 ${styles.constructor}`}>
        {bun.length > 0 && (
          <ConstructorElement
            type="top"
            text={bun[0].name + ' ' + '(верх)'}
            price={bun[0].price}
            thumbnail={bun[0].image}
            isLocked
            extraClass='ml-8 mr-2'
          />
        )
        }
        <div className={`custom-scroll pr-2 ${styles.ingredients}`}>
          {fillings.map((item) => (
            <ConstructorItem 
              ingredientData={item}
              key={item.key} 
            />
          ))}
        </div>
        {bun.length > 0 && (
          <ConstructorElement
            type="bottom"
            text={bun[0].name + ' ' + '(низ)'}
            price={bun[0].price}
            thumbnail={bun[0].image}
            isLocked
            extraClass='ml-8 mr-2'
          />
        )
        }
      </div>

      <div className={styles.total_price}>
        <p className='text text_type_digits-medium'>
          {totalPrice}
          <span className='ml-2'><CurrencyIcon type='primary' /></span>
        </p>
        <Button 
          onClick={handleGetOrder} 
          htmlType="button" 
          type="primary" 
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      
      {isOrderModalOpen && (
        <Modal toggle={closeOrderModal} opened={isOrderModalOpen}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

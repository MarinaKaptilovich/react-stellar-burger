import styles from './order-details.module.css';
import image from '../../images/done.png';

import { useSelector } from 'react-redux';

export default function OrderDetails() {
  const orderNumber = useSelector(state => state.orderData.order.number);

  return (
    <>
      <p className={`${styles.text_glow} text text_type_digits-large mt-30`}>
        {orderNumber}
      </p>
      <h1 className="text text_type_main-medium mt-8">
        идентификатор заказа
      </h1>
      <img className={`${styles.done} mt-15`} src={image} alt="done" />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

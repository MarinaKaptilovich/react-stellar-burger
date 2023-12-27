import styles from './order_id.module.css';
import { 
    useEffect,
    useState
} from 'react';
import { 
    FormattedDate,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../../types/hooks';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../../utils/api';
import { findIngredientById } from '../../../utils/utils';
import { findIngredientIndexes } from './hook';
import { IngredientType } from '../../../types/ingredients';
import { WebSocketOrder } from '../../../types/middleware';

export default function OrderId() {
    const { number } = useParams();
    const { ingredients } = useAppSelector(state => state.ingredientsData);
    const [order, setOrder] = useState<{ data: WebSocketOrder | null, error: boolean }>(
        {
            data: null,
            error: false
        }
    );

    useEffect(() => {
        if (number) {
            getOrder(number)
            .then(res => {
                setOrder({ ...order, data: res.orders[0] })
            })
        }
    }, []);

    let selectedIngredients: IngredientType[] = [];
    let totalOrderPrice: number = 0;
    if (order.data && ingredients != null) {
        selectedIngredients = order.data.ingredients
            .map(itemId => findIngredientById(ingredients, itemId))
            .filter(ingredient => ingredient !== undefined) as IngredientType[];
        totalOrderPrice = selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    };

    const date = () => {
        const dateFromServer = order.data != null ? order.data.createdAt : ''
        return <FormattedDate date={new Date(dateFromServer)} className='text text_type_main-default text_color_inactive'/>
    };

    return (
        <section className={styles.section}>
            <p className={`${styles.order_number} text text_type_digits-default`}>
                { `#${order.data != null && order.data.number}` }
            </p>
            <h1 className={`${styles.order_title} text text_type_main-medium`}>
                { order.data != null && order.data.name }
            </h1>
            <p className={`${styles.order_status} text text_type_main-default text_color_inactive`}>
                { order.data != null && order.data.status === 'done' ? 'Выполнен' : 'Готовится' }
            </p>
            <p className={`${styles.order_structure} text text_type_main-medium`}>
                Состав:
            </p>
            <ul className={`${styles.ingredients} custom-scroll`}>
                {selectedIngredients && selectedIngredients.map((item, index, array) => {
                    const { count, indexes } = findIngredientIndexes(item, array);
                    if (count > 1 && index === indexes[0]) {
                        return (
                            <li className={styles.ingredient} key={index}>
                                <div className={styles.ingredient_image} style={{backgroundImage: `url(${item.image_mobile})`}} />

                                <h2 className={`${styles.ingredient_title} text text_type_main-default`}>
                                    {item.name}
                                </h2>
                                <div className={styles.ingredient_price}>
                                    <p className="text text_type_digits-default">
                                        {`${count}x${item.price}`}
                                    </p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </li>
                    )}

                    if (count > 1 && index !== indexes[0]) {
                        return null
                    }
                    
                    return (
                        <li className={styles.ingredient} key={index}>
                            <div className={styles.ingredient_image} style={{backgroundImage: `url(${item.image_mobile})`}} />
                            <h2 className={`${styles.ingredient_title} text text_type_main-default`}>
                                {item.name}
                            </h2>
                            <div className={styles.ingredient_price}>
                                <p className="text text_type_digits-default">
                                {`${count}x${item.price}`}
                                </p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className={styles.summary}>
                {date()}
                <div className={styles.total_price}>
                    <p className="text text_type_digits-default">
                        { totalOrderPrice }
                    </p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </section>
    )
}